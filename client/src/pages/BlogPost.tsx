import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { marked } from "marked";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

marked.setOptions({ breaks: true, gfm: true });

function renderMarkdown(content: string): string {
  try {
    const cleaned = content.replace(/^#{1,2}[^\n]*\n+/, "");
    const result = marked.parse(cleaned);
    return typeof result === "string" ? result : content;
  } catch {
    return content;
  }
}

const BASE_URL = "https://brunomiotocardiologista.com";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();

  const { data: post, isLoading } = trpc.blog.getPost.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug }
  );

  // Dynamic meta tags for SEO
  useEffect(() => {
    if (!post) return;

    // Title
    document.title = `${post.title} | Dr. Bruno Mioto – Cardiologista`;

    // Description
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (property) el.setAttribute("property", name);
        else el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const description =
      post.excerpt ||
      `Artigo sobre ${post.title} escrito pelo Dr. Bruno Mahler Mioto, cardiologista em São Paulo.`;

    setMeta("description", description);
    setMeta("robots", "index, follow");

    // Canonical
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}/blog/${post.slug}`);

    // Open Graph
    setMeta("og:type", "article", true);
    setMeta("og:title", `${post.title} | Dr. Bruno Mioto`, true);
    setMeta("og:description", description, true);
    setMeta("og:url", `${BASE_URL}/blog/${post.slug}`, true);
    if (post.coverImage) {
      const ogImage = post.coverImage.startsWith("http")
        ? post.coverImage
        : `${BASE_URL}${post.coverImage}`;
      setMeta("og:image", ogImage, true);
    }
    setMeta("og:locale", "pt_BR", true);
    setMeta("og:site_name", "Dr. Bruno Mioto – Cardiologia", true);

    // Article structured data
    const existingScript = document.querySelector(
      'script[data-type="article-ld"]'
    );
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-type", "article-ld");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      headline: post.title,
      description: description,
      url: `${BASE_URL}/blog/${post.slug}`,
      image: post.coverImage || undefined,
      datePublished: post.publishedAt,
      author: {
        "@type": "Physician",
        name: "Dr. Bruno Mahler Mioto",
        url: BASE_URL,
      },
      publisher: {
        "@type": "MedicalBusiness",
        name: "Dr. Bruno Mioto – Medicina e Cardiologia",
        url: BASE_URL,
      },
      inLanguage: "pt-BR",
      medicalAudience: {
        "@type": "MedicalAudience",
        audienceType: "Patient",
      },
    });
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.title = "Dr. Bruno Mioto | Cardiologista em São Paulo – CRM 112007-SP";
      script.remove();
    };
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "var(--cream)" }}>
        <Navbar />
        <div className="container max-w-3xl py-32">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen" style={{ background: "var(--cream)" }}>
        <Navbar />
        <div className="container max-w-3xl py-32 text-center">
          <h1
            className="font-serif text-3xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--ink)" }}
          >
            Artigo não encontrado
          </h1>
          <button
            onClick={() => navigate("/#blog")}
            className="flex items-center gap-2 mx-auto text-sm hover:opacity-70 transition-opacity"
            style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Cover image */}
        {post.coverImage && (
          <div className="w-full overflow-hidden mb-0" style={{ maxHeight: "420px" }}>
            <img
              src={post.coverImage}
              alt={`Imagem ilustrativa: ${post.title}`}
              className="w-full object-cover"
              style={{ maxHeight: "420px" }}
            />
          </div>
        )}

        <div className="container max-w-3xl py-12">
          {/* Back link */}
          <button
            onClick={() => navigate("/#blog")}
            className="flex items-center gap-2 mb-10 text-sm hover:opacity-70 transition-opacity"
            style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
          </button>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="editorial-line" />
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
            >
              Artigo
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-serif mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "var(--ink)",
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8" style={{ borderBottom: "1px solid var(--border-fine)" }}>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
              <span style={{ color: "var(--medical-blue)", fontWeight: 500 }}>Dr. Bruno Mahler Mioto</span>
              <span>· Cardiologista CRM 112007-SP</span>
            </div>
            {publishedDate && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                <Calendar className="w-3.5 h-3.5" />
                {publishedDate}
              </div>
            )}
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="mb-8 text-lg leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--ink-light)",
                fontStyle: "italic",
                fontSize: "1.2rem",
              }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="prose-editorial"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Footer CTA */}
          <div
            className="mt-16 p-8 text-center"
            style={{ background: "var(--cream-dark)", border: "1px solid var(--border-fine)" }}
          >
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}
            >
              Este artigo é informativo e não substitui a consulta médica.
            </p>
            <a
              href={`https://wa.me/5511945556605?text=Olá,%20li%20o%20artigo%20sobre%20${encodeURIComponent(post.title)}%20e%20gostaria%20de%20agendar%20uma%20consulta.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
            >
              Agendar Consulta com Dr. Bruno Mioto
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
