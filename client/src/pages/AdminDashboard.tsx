import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, MessageSquare, FileText, LogOut, LayoutDashboard, Plus, Trash2, CheckCircle, XCircle, Clock, Eye, Edit } from "lucide-react";
import { getLoginUrl } from "@/const";

type Tab = "overview" | "appointments" | "contacts" | "blog";

const statusColors: Record<string, string> = {
  pending: "oklch(72% 0.08 75)",
  confirmed: "oklch(55% 0.15 145)",
  cancelled: "oklch(55% 0.2 25)",
  completed: "oklch(38% 0.12 240)",
};
const statusLabels: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  cancelled: "Cancelado",
  completed: "Concluído",
};

export default function AdminDashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", slug: "", excerpt: "", content: "", published: false });

  const utils = trpc.useUtils();

  const { data: appointments } = trpc.appointments.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: contactMessages } = trpc.contacts.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: allPosts } = trpc.blog.listAllPosts.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: categories } = trpc.blog.listCategories.useQuery();

  const updateStatus = trpc.appointments.updateStatus.useMutation({
    onSuccess: () => { utils.appointments.list.invalidate(); toast.success("Status atualizado!"); },
  });
  const deleteAppointment = trpc.appointments.delete.useMutation({
    onSuccess: () => { utils.appointments.list.invalidate(); toast.success("Agendamento removido."); },
  });
  const markRead = trpc.contacts.markRead.useMutation({
    onSuccess: () => utils.contacts.list.invalidate(),
  });
  const deleteContact = trpc.contacts.delete.useMutation({
    onSuccess: () => { utils.contacts.list.invalidate(); toast.success("Mensagem removida."); },
  });
  const createPost = trpc.blog.createPost.useMutation({
    onSuccess: () => {
      utils.blog.listAllPosts.invalidate();
      setShowNewPost(false);
      setNewPost({ title: "", slug: "", excerpt: "", content: "", published: false });
      toast.success("Artigo criado!");
    },
  });
  const deletePost = trpc.blog.deletePost.useMutation({
    onSuccess: () => { utils.blog.listAllPosts.invalidate(); toast.success("Artigo removido."); },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div className="text-center p-8" style={{ border: "1px solid var(--border-fine)", background: "var(--cream-dark)" }}>
          <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: "var(--ink)", fontFamily: "'Playfair Display', serif" }}>
            Acesso Restrito
          </h2>
          <p className="mb-6 text-sm" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
            Faça login para acessar o painel administrativo.
          </p>
          <a
            href={getLoginUrl()}
            className="px-6 py-3 text-sm font-medium text-white"
            style={{ background: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
          >
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div className="text-center p-8">
          <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--ink)", fontFamily: "'Playfair Display', serif" }}>
            Acesso Negado
          </h2>
          <p className="text-sm" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
            Você não tem permissão para acessar esta área.
          </p>
        </div>
      </div>
    );
  }

  const pendingCount = (appointments ?? []).filter((a) => a.status === "pending").length;
  const unreadCount = (contactMessages ?? []).filter((c) => !c.read).length;

  const navItems: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "overview", label: "Visão Geral", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "appointments", label: "Agendamentos", icon: <Calendar className="w-4 h-4" />, badge: pendingCount },
    { id: "contacts", label: "Mensagens", icon: <MessageSquare className="w-4 h-4" />, badge: unreadCount },
    { id: "blog", label: "Blog", icon: <FileText className="w-4 h-4" /> },
  ];

  const sidebarStyle = {
    width: "240px",
    minHeight: "100vh",
    background: "var(--navy)",
    borderRight: "1px solid oklch(30% 0.08 240)",
    flexShrink: 0,
  };

  return (
    <div className="flex min-h-screen" style={{ background: "var(--cream-dark)" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle} className="flex flex-col">
        <div className="p-6 border-b" style={{ borderColor: "oklch(30% 0.08 240)" }}>
          <div className="font-serif text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Painel Admin
          </div>
          <div className="text-xs mt-0.5" style={{ color: "oklch(65% 0.04 240)", fontFamily: "'Inter', sans-serif" }}>
            Dr. Bruno Mahler Mioto
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="flex items-center justify-between px-3 py-2.5 text-sm text-left transition-colors rounded-sm"
              style={{
                background: tab === item.id ? "oklch(30% 0.08 240)" : "transparent",
                color: tab === item.id ? "white" : "oklch(70% 0.03 240)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                {item.label}
              </div>
              {item.badge ? (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: "oklch(55% 0.2 25)", color: "white", minWidth: "20px", textAlign: "center" }}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "oklch(30% 0.08 240)" }}>
          <div className="text-xs mb-3" style={{ color: "oklch(55% 0.025 240)", fontFamily: "'Inter', sans-serif" }}>
            {user.name || user.email}
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
            style={{ color: "oklch(65% 0.04 240)", fontFamily: "'Inter', sans-serif" }}
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Overview */}
        {tab === "overview" && (
          <div>
            <h1 className="font-serif text-2xl font-bold mb-8" style={{ color: "var(--ink)", fontFamily: "'Playfair Display', serif" }}>
              Visão Geral
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Agendamentos Pendentes", value: pendingCount, icon: <Clock className="w-5 h-5" />, color: "var(--gold-accent)" },
                { label: "Mensagens Não Lidas", value: unreadCount, icon: <MessageSquare className="w-5 h-5" />, color: "var(--medical-blue)" },
                { label: "Artigos Publicados", value: (allPosts ?? []).filter((p) => p.published).length, icon: <FileText className="w-5 h-5" />, color: "oklch(55% 0.15 145)" },
              ].map((stat) => (
                <div key={stat.label} className="p-6" style={{ background: "var(--cream)", border: "1px solid var(--border-fine)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 flex items-center justify-center" style={{ background: "var(--medical-blue-pale)", color: stat.color }}>
                      {stat.icon}
                    </div>
                    <span className="text-xs tracking-wide uppercase" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                      {stat.label}
                    </span>
                  </div>
                  <div className="font-serif text-3xl font-bold" style={{ color: "var(--ink)", fontFamily: "'Playfair Display', serif" }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6" style={{ background: "var(--cream)", border: "1px solid var(--border-fine)" }}>
              <h3 className="font-medium mb-4 text-sm" style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}>
                Últimos Agendamentos
              </h3>
              {(appointments ?? []).slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--border-fine)" }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}>{apt.patientName}</div>
                    <div className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>{apt.consultationType}</div>
                  </div>
                  <span className="text-xs px-2 py-1" style={{ background: statusColors[apt.status] + "22", color: statusColors[apt.status], fontFamily: "'Inter', sans-serif" }}>
                    {statusLabels[apt.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointments */}
        {tab === "appointments" && (
          <div>
            <h1 className="font-serif text-2xl font-bold mb-8" style={{ color: "var(--ink)", fontFamily: "'Playfair Display', serif" }}>
              Agendamentos
            </h1>
            <div className="flex flex-col gap-3">
              {(appointments ?? []).map((apt) => (
                <div key={apt.id} className="p-5" style={{ background: "var(--cream)", border: "1px solid var(--border-fine)" }}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium" style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}>{apt.patientName}</span>
                        <span className="text-xs px-2 py-0.5" style={{ background: statusColors[apt.status] + "22", color: statusColors[apt.status], fontFamily: "'Inter', sans-serif" }}>
                          {statusLabels[apt.status]}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                        <span>📧 {apt.patientEmail}</span>
                        <span>📞 {apt.patientPhone}</span>
                        <span>🏥 {apt.consultationType}</span>
                        <span>📅 {new Date(apt.appointmentDate).toLocaleString("pt-BR")}</span>
                      </div>
                      {apt.notes && <p className="mt-2 text-xs italic" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>{apt.notes}</p>}
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={apt.status}
                        onChange={(e) => updateStatus.mutate({ id: apt.id, status: e.target.value as any })}
                        className="text-xs px-2 py-1.5"
                        style={{ border: "1px solid var(--border-fine)", background: "var(--cream-dark)", color: "var(--ink)", fontFamily: "'Inter', sans-serif", cursor: "pointer" }}
                      >
                        <option value="pending">Pendente</option>
                        <option value="confirmed">Confirmado</option>
                        <option value="cancelled">Cancelado</option>
                        <option value="completed">Concluído</option>
                      </select>
                      <button
                        onClick={() => { if (confirm("Remover agendamento?")) deleteAppointment.mutate({ id: apt.id }); }}
                        className="p-1.5 transition-opacity hover:opacity-70"
                        style={{ color: "oklch(55% 0.2 25)" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {(appointments ?? []).length === 0 && (
                <div className="text-center py-12 text-sm" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  Nenhum agendamento encontrado.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contacts */}
        {tab === "contacts" && (
          <div>
            <h1 className="font-serif text-2xl font-bold mb-8" style={{ color: "var(--ink)", fontFamily: "'Playfair Display', serif" }}>
              Mensagens de Contato
            </h1>
            <div className="flex flex-col gap-3">
              {(contactMessages ?? []).map((msg) => (
                <div
                  key={msg.id}
                  className="p-5"
                  style={{
                    background: msg.read ? "var(--cream)" : "var(--medical-blue-pale)",
                    border: `1px solid ${msg.read ? "var(--border-fine)" : "var(--medical-blue-light)"}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm" style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}>{msg.name}</span>
                        {!msg.read && (
                          <span className="text-xs px-1.5 py-0.5" style={{ background: "var(--medical-blue)", color: "white", fontFamily: "'Inter', sans-serif" }}>
                            Novo
                          </span>
                        )}
                      </div>
                      <div className="text-xs mb-2" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                        {msg.email} {msg.phone ? `· ${msg.phone}` : ""}
                      </div>
                      <div className="text-xs font-medium mb-1" style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}>
                        Assunto: {msg.subject}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--ink-light)", fontFamily: "'Inter', sans-serif" }}>
                        {msg.message}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {!msg.read && (
                        <button onClick={() => markRead.mutate({ id: msg.id })} className="p-1.5 transition-opacity hover:opacity-70" style={{ color: "var(--medical-blue)" }} title="Marcar como lida">
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => { if (confirm("Remover mensagem?")) deleteContact.mutate({ id: msg.id }); }}
                        className="p-1.5 transition-opacity hover:opacity-70"
                        style={{ color: "oklch(55% 0.2 25)" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {(contactMessages ?? []).length === 0 && (
                <div className="text-center py-12 text-sm" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  Nenhuma mensagem encontrada.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blog */}
        {tab === "blog" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-serif text-2xl font-bold" style={{ color: "var(--ink)", fontFamily: "'Playfair Display', serif" }}>
                Artigos do Blog
              </h1>
              <button
                onClick={() => setShowNewPost(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white"
                style={{ background: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
              >
                <Plus className="w-4 h-4" />
                Novo Artigo
              </button>
            </div>

            {showNewPost && (
              <div className="mb-8 p-6" style={{ background: "var(--cream)", border: "1px solid var(--border-fine)" }}>
                <h3 className="font-medium mb-4" style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}>Novo Artigo</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { key: "title", label: "Título", type: "text", placeholder: "Título do artigo" },
                    { key: "slug", label: "Slug (URL)", type: "text", placeholder: "titulo-do-artigo" },
                    { key: "excerpt", label: "Resumo", type: "text", placeholder: "Breve descrição do artigo" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={(newPost as any)[field.key]}
                        onChange={(e) => setNewPost({ ...newPost, [field.key]: e.target.value })}
                        className="w-full px-3 py-2 text-sm"
                        style={{ border: "1px solid var(--border-fine)", background: "var(--cream-dark)", color: "var(--ink)", fontFamily: "'Inter', sans-serif", outline: "none" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs tracking-wide uppercase mb-1.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>Conteúdo (HTML)</label>
                    <textarea
                      placeholder="<p>Conteúdo do artigo em HTML...</p>"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      rows={8}
                      className="w-full px-3 py-2 text-sm"
                      style={{ border: "1px solid var(--border-fine)", background: "var(--cream-dark)", color: "var(--ink)", fontFamily: "'Inter', sans-serif", outline: "none", resize: "vertical" }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="published" checked={newPost.published} onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })} />
                    <label htmlFor="published" className="text-sm" style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}>Publicar imediatamente</label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => createPost.mutate(newPost)}
                      disabled={createPost.isPending}
                      className="px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
                      style={{ background: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
                    >
                      {createPost.isPending ? "Salvando..." : "Salvar Artigo"}
                    </button>
                    <button
                      onClick={() => setShowNewPost(false)}
                      className="px-5 py-2 text-sm font-medium"
                      style={{ border: "1px solid var(--border-fine)", color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {(allPosts ?? []).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4" style={{ background: "var(--cream)", border: "1px solid var(--border-fine)" }}>
                  <div>
                    <div className="font-medium text-sm" style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}>{post.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                      {post.categoryName || "Sem categoria"} · {post.published ? "Publicado" : "Rascunho"}
                    </div>
                  </div>
                  <button
                    onClick={() => { if (confirm("Remover artigo?")) deletePost.mutate({ id: post.id }); }}
                    className="p-1.5 transition-opacity hover:opacity-70"
                    style={{ color: "oklch(55% 0.2 25)" }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {(allPosts ?? []).length === 0 && (
                <div className="text-center py-12 text-sm" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  Nenhum artigo encontrado. Crie o primeiro!
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
