import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { marked } from "marked";

// Configure marked for safe rendering
marked.setOptions({ breaks: true, gfm: true });

function renderMarkdown(content: string): string {
  try {
    // Remove leading h1/h2 that duplicates the title already shown above
    const cleaned = content.replace(/^#{1,2}[^\n]*\n+/, '');
    const result = marked.parse(cleaned);
    return typeof result === 'string' ? result : content;
  } catch {
    return content;
  }
}

const BLOG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663487163811/SckqfAEKum3y7MUd9ehQ4K/blog-heart-health-QNoUy4UveNJE85ZKMXPcvr.webp";

export default function BlogSection() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [, navigate] = useLocation();

  const { data: posts } = trpc.blog.listPosts.useQuery({ search, categoryId: selectedCategory ?? undefined });
  const { data: categories } = trpc.blog.listCategories.useQuery();

  const filteredPosts = posts ?? [];

  return (
    <section id="blog" className="py-24 lg:py-32" style={{ background: "var(--cream-dark)" }}>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="editorial-line" />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}>
                Educação em Saúde
              </span>
            </div>
            <h2 className="font-serif" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--ink)" }}>
              Blog & Artigos
            </h2>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--ink-muted)" }} />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm"
              style={{
                border: "1px solid var(--border-fine)",
                background: "var(--cream)",
                color: "var(--ink)",
                fontFamily: "'Inter', sans-serif",
                outline: "none",
                width: "240px",
              }}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-1.5 text-xs tracking-wide transition-colors"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: selectedCategory === null ? "var(--medical-blue)" : "transparent",
              color: selectedCategory === null ? "white" : "var(--ink-muted)",
              border: "1px solid",
              borderColor: selectedCategory === null ? "var(--medical-blue)" : "var(--border-fine)",
            }}
          >
            Todos
          </button>
          {(categories ?? []).map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="px-4 py-1.5 text-xs tracking-wide transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: selectedCategory === cat.id ? "var(--medical-blue)" : "transparent",
                color: selectedCategory === cat.id ? "white" : "var(--ink-muted)",
                border: "1px solid",
                borderColor: selectedCategory === cat.id ? "var(--medical-blue)" : "var(--border-fine)",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
            Nenhum artigo encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: any) => (
              <article
                key={post.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div className="overflow-hidden mb-4" style={{ height: "200px" }}>
                  <img
                    src={post.coverImage || BLOG_IMAGE}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div
                  className="text-xs tracking-[0.1em] uppercase mb-2"
                  style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
                >
                  {post.categoryName || "Cardiologia"}
                </div>
                <h3
                  className="font-serif font-semibold mb-2 group-hover:underline"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.125rem", color: "var(--ink)", lineHeight: 1.3 }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}>
                  Ler artigo <ArrowRight className="w-3 h-3" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
