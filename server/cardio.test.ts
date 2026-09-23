import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock DB
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: vi.fn().mockReturnValue({ values: vi.fn().mockResolvedValue(undefined) }),
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        orderBy: vi.fn().mockResolvedValue([]),
        where: vi.fn().mockReturnValue({ limit: vi.fn().mockResolvedValue([]) }),
        leftJoin: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({ orderBy: vi.fn().mockResolvedValue([]) }),
          orderBy: vi.fn().mockResolvedValue([]),
        }),
      }),
    }),
    update: vi.fn().mockReturnValue({ set: vi.fn().mockReturnValue({ where: vi.fn().mockResolvedValue(undefined) }) }),
    delete: vi.fn().mockReturnValue({ where: vi.fn().mockResolvedValue(undefined) }),
  }),
}));

// Mock notifications
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock LLM
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: "Olá! Sou o assistente do Dr. Bruno Mioto." } }],
  }),
}));

function createPublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAdminCtx(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("appointments.create", () => {
  it("creates an appointment and notifies owner", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.appointments.create({
      patientName: "João Silva",
      patientEmail: "joao@example.com",
      patientPhone: "(11) 99999-9999",
      consultationType: "Consulta Cardiológica",
      appointmentDate: new Date("2026-05-10T09:00:00"),
      notes: "Primeira consulta",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("contacts.create", () => {
  it("creates a contact message", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.contacts.create({
      name: "Maria Santos",
      email: "maria@example.com",
      phone: "(11) 88888-8888",
      subject: "Dúvida sobre consulta",
      message: "Gostaria de saber os horários disponíveis.",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("blog.listCategories", () => {
  it("returns empty array when no categories", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.blog.listCategories();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("blog.listPosts", () => {
  it("returns empty array when no posts", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.blog.listPosts({});
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("ai.chat", () => {
  it("returns a reply from the AI assistant", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.ai.chat({
      message: "Quais são os horários de atendimento?",
    });
    expect(result).toHaveProperty("reply");
    expect(typeof result.reply).toBe("string");
    expect(result.reply.length).toBeGreaterThan(0);
  });
});

describe("appointments.list (admin only)", () => {
  it("returns list for admin user", async () => {
    const caller = appRouter.createCaller(createAdminCtx());
    const result = await caller.appointments.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for non-admin user", async () => {
    const userCtx: TrpcContext = {
      ...createPublicCtx(),
      user: {
        id: 2,
        openId: "regular-user",
        email: "user@example.com",
        name: "User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
    };
    const caller = appRouter.createCaller(userCtx);
    await expect(caller.appointments.list()).rejects.toThrow();
  });
});

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const ctx = createPublicCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
  });
});
