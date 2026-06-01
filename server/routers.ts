import { z } from "zod";
import { eq, desc, like, and, or } from "drizzle-orm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { appointments, contacts, blogPosts, blogCategories } from "../drizzle/schema";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

// Admin guard
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── APPOINTMENTS ──
  appointments: router({
    create: publicProcedure
      .input(
        z.object({
          patientName: z.string().min(2),
          patientEmail: z.string().email(),
          patientPhone: z.string().min(8),
          consultationType: z.string().min(2),
          appointmentDate: z.date(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(appointments).values({
          patientName: input.patientName,
          patientEmail: input.patientEmail,
          patientPhone: input.patientPhone,
          consultationType: input.consultationType,
          appointmentDate: input.appointmentDate,
          notes: input.notes,
          status: "pending",
        });
        // Notify owner
        const dateStr = input.appointmentDate.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        await notifyOwner({
          title: `Novo Agendamento: ${input.patientName}`,
          content: `Paciente: ${input.patientName}\nEmail: ${input.patientEmail}\nTelefone: ${input.patientPhone}\nTipo: ${input.consultationType}\nData: ${dateStr}\nObservações: ${input.notes || "Nenhuma"}`,
        });
        return { success: true };
      }),

    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(appointments).orderBy(desc(appointments.createdAt));
    }),

    updateStatus: adminProcedure
      .input(z.object({ id: z.number(), status: z.enum(["pending", "confirmed", "cancelled", "completed"]) }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.update(appointments).set({ status: input.status }).where(eq(appointments.id, input.id));
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(appointments).where(eq(appointments.id, input.id));
        return { success: true };
      }),
  }),

  // ── CONTACTS ──
  contacts: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(2),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().min(2),
          message: z.string().min(5),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(contacts).values(input);
        await notifyOwner({
          title: `Nova Mensagem: ${input.subject}`,
          content: `De: ${input.name} <${input.email}>\nTelefone: ${input.phone || "Não informado"}\nAssunto: ${input.subject}\n\n${input.message}`,
        });
        return { success: true };
      }),

    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(contacts).orderBy(desc(contacts.createdAt));
    }),

    markRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.update(contacts).set({ read: true }).where(eq(contacts.id, input.id));
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(contacts).where(eq(contacts.id, input.id));
        return { success: true };
      }),
  }),

  // ── BLOG ──
  blog: router({
    listCategories: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(blogCategories).orderBy(blogCategories.name);
    }),

    listPosts: publicProcedure
      .input(z.object({ search: z.string().optional(), categoryId: z.number().optional() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const conditions = [eq(blogPosts.published, true)];
        if (input.categoryId) conditions.push(eq(blogPosts.categoryId, input.categoryId));
        const rows = await db
          .select({
            id: blogPosts.id,
            title: blogPosts.title,
            slug: blogPosts.slug,
            excerpt: blogPosts.excerpt,
            content: blogPosts.content,
            coverImage: blogPosts.coverImage,
            publishedAt: blogPosts.publishedAt,
            categoryId: blogPosts.categoryId,
            categoryName: blogCategories.name,
          })
          .from(blogPosts)
          .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
          .where(and(...conditions))
          .orderBy(desc(blogPosts.publishedAt));
        if (input.search) {
          const q = input.search.toLowerCase();
          return rows.filter(
            (r) =>
              r.title.toLowerCase().includes(q) ||
              (r.excerpt ?? "").toLowerCase().includes(q)
          );
        }
        return rows;
      }),

    getPost: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const rows = await db
          .select()
          .from(blogPosts)
          .where(and(eq(blogPosts.slug, input.slug), eq(blogPosts.published, true)))
          .limit(1);
        return rows[0] ?? null;
      }),

    // Admin
    listAllPosts: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select({
          id: blogPosts.id,
          title: blogPosts.title,
          slug: blogPosts.slug,
          published: blogPosts.published,
          publishedAt: blogPosts.publishedAt,
          createdAt: blogPosts.createdAt,
          categoryName: blogCategories.name,
        })
        .from(blogPosts)
        .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
        .orderBy(desc(blogPosts.createdAt));
    }),

    createPost: adminProcedure
      .input(
        z.object({
          title: z.string().min(3),
          slug: z.string().min(3),
          excerpt: z.string().optional(),
          content: z.string().min(10),
          coverImage: z.string().optional(),
          categoryId: z.number().optional(),
          published: z.boolean().default(false),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.insert(blogPosts).values({
          ...input,
          publishedAt: input.published ? new Date() : undefined,
        });
        return { success: true };
      }),

    updatePost: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().min(3).optional(),
          excerpt: z.string().optional(),
          content: z.string().min(10).optional(),
          coverImage: z.string().optional(),
          categoryId: z.number().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const { id, ...data } = input;
        const updateData: Record<string, unknown> = { ...data };
        if (data.published) updateData.publishedAt = new Date();
        await db.update(blogPosts).set(updateData).where(eq(blogPosts.id, id));
        return { success: true };
      }),

    deletePost: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(blogPosts).where(eq(blogPosts.id, input.id));
        return { success: true };
      }),
  }),

  // ── AI CHAT ──
  ai: router({
    chat: publicProcedure
      .input(
        z.object({
          message: z.string().min(1).max(500),
          history: z
            .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
            .optional(),
        })
      )
      .mutation(async ({ input }) => {
        const systemPrompt = `Você é o assistente virtual do consultório do Dr. Bruno Mahler Mioto, cardiologista e clínico geral em São Paulo.

Informações da clínica:
- Endereço: R. Oscar Freire, 2250 Conj. 115, Pinheiros — São Paulo/SP
- Telefone: (11) 3063-4890
- WhatsApp: (11) 94555-6605
- Horário: Segunda, terça, quinta e sexta, das 13h30 às 19h30
- CRM: 112007-SP | RQE 89316 (Cardiologia) | RQE 89317 (Clínica Geral)

Serviços oferecidos: Consulta Cardiológica, Check-up Cardiovascular, Avaliação Pré-Operatória, Clínica Geral. O Dr. Bruno não realiza exames complementares no consultório (apenas consultas e avaliações clínicas).

Responda de forma clara, educada e profissional em português. Para agendamentos, oriente o paciente a usar o formulário no site ou ligar para (11) 3063-4890. Não forneça diagnósticos médicos. Mantenha respostas concisas (máximo 3 parágrafos).`;

        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...(input.history ?? []).slice(-6).map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
          { role: "user" as const, content: input.message },
        ];

        const response = await invokeLLM({ messages });
        const rawContent = response.choices?.[0]?.message?.content;
        const reply = typeof rawContent === "string" ? rawContent : "Desculpe, não consegui processar sua mensagem. Por favor, entre em contato pelo telefone (11) 3063-4890.";
        return { reply };
      }),
  }),
});

export type AppRouter = typeof appRouter;
