import { useState } from "react";
import { Heart, ChevronDown, Award, Stethoscope, Activity, Calendar, Phone, MapPin, Clock, MessageCircle, ArrowRight, Star, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppointmentSection from "./AppointmentSection";
import ContactSection from "./ContactSection";
import BlogSection from "./BlogSection";
import AIChatWidget from "@/components/AIChatWidget";
import WhatsAppButton from "@/components/WhatsAppButton";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663487163811/SckqfAEKum3y7MUd9ehQ4K/dr-bruno-palestra_1521b83c.jpeg";
const HEART_IMAGE = "/foto-bruno.jpeg";
const SERVICES_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663487163811/SckqfAEKum3y7MUd9ehQ4K/dr-bruno-microfone_0bd63fac.jpg";

const services = [
  {
    icon: <Stethoscope className="w-5 h-5" />,
    title: "Consulta Cardiológica",
    description: "Avaliação clínica completa do sistema cardiovascular, incluindo histórico familiar, exame físico e análise de fatores de risco.",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Check-up Cardiovascular",
    description: "Avaliação preventiva completa com exames laboratoriais, de imagem e avaliação clínica para detecção precoce de doenças.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Clínica Geral",
    description: "Atendimento integral ao paciente adulto, com diagnóstico e tratamento das principais doenças clínicas.",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Avaliação Pré-Operatória",
    description: "Avaliação cardiovascular completa antes de procedimentos cirúrgicos, com emissão de laudo e orientações ao paciente e à equipe cirúrgica.",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Tratamento da Obesidade",
    description: "Abordagem clínica integrada para controle do peso corporal, com foco na redução do risco cardiovascular e metabólico associado à obesidade.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Coronariopatia Complexa",
    description: "Acompanhamento especializado de pacientes com doença coronariana complexa, incluindo síndromes coronarianas agudas, lesões multiarteriais e casos de alto risco.",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "Planos de Acompanhamento",
    description: "Modelo estruturado de cuidado contínuo, no qual o paciente é acompanhado ao longo do tempo com metas, monitoramento e ajustes periódicos.",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Acompanhamento de Pacientes Internados",
    description: "Assistência cardiológica durante internação hospitalar, com avaliação contínua, suporte à equipe médica e orientação para alta segura.",
  },
];

const education = [
  { year: "USP", title: "Doutor em Ciências pela USP", desc: "Doutorado em Ciências pela Universidade de São Paulo (FMUSP)" },
  { year: "USP", title: "Professor Colaborador da USP", desc: "Docente colaborador da Faculdade de Medicina da Universidade de São Paulo" },
  { year: "InCor", title: "Unidade Clínica de Aterosclerose e Coronariopatia Crônica", desc: "Médico da Unidade Clínica de Aterosclerose e Coronariopatia Crônica do InCor – HCFMUSP" },
];

export default function Home() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "var(--cream)" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Dr. Bruno Mioto palestrando em congresso de cardiologia"
            className="w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, var(--cream) 40%, transparent 100%)",
            }}
          />
        </div>

        {/* Fine geometric lines */}
        <div className="absolute top-24 right-12 w-px h-48 hidden lg:block" style={{ background: "var(--border-fine)" }} />
        <div className="absolute top-24 right-20 w-px h-32 hidden lg:block" style={{ background: "var(--border-fine)", opacity: 0.5 }} />
        <div className="absolute bottom-32 left-0 w-32 h-px hidden lg:block" style={{ background: "var(--border-fine)" }} />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="editorial-line" />
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
              >
                Cardiologia & Clínica Geral — São Paulo
              </span>
            </div>

            {/* Main headline — Didone massive */}
            <h1
              className="font-serif leading-[0.92] mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                color: "var(--ink)",
                letterSpacing: "-0.03em",
              }}
            >
              Dr. Bruno
              <br />
              <span style={{ color: "var(--medical-blue)" }}>Mioto</span>
            </h1>

            {/* Subtitle — Cormorant light */}
            <p
              className="mb-4 leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                fontWeight: 400,
                color: "var(--ink-light)",
                fontStyle: "italic",
              }}
            >
              "Só se vê bem com o coração, o essencial é invisível aos olhos."
            </p>

            <p
              className="mb-10 max-w-xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9375rem",
                color: "var(--ink-muted)",
                lineHeight: 1.7,
                letterSpacing: "0.01em",
              }}
            >
              Cardiologista e Clínico Geral com formação pela USP e atuação nos principais hospitais de São Paulo.
              Cuidado humanizado com excelência técnica para a saúde do seu coração.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#agendamento")}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "var(--medical-blue)",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                <Calendar className="w-4 h-4" />
                Agendar Consulta
              </button>
              <button
                onClick={() => scrollTo("#sobre")}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-all hover:opacity-80"
                style={{
                  border: "1px solid var(--border-fine)",
                  color: "var(--ink-light)",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.05em",
                  background: "transparent",
                }}
              >
                Conhecer o Médico
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-14 pt-10" style={{ borderTop: "1px solid var(--border-fine)" }}>
              {[
                { value: "15+", label: "Anos de Experiência" },
                { value: "19K+", label: "Seguidores no Instagram" },
                { value: "USP", label: "Formação" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-serif text-2xl font-bold"
                    style={{ color: "var(--medical-blue)", fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-wide mt-0.5"
                    style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo("#sobre")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-80 transition-opacity"
        >
          <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
            Rolar
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: "var(--ink-muted)" }} />
        </button>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="py-24 lg:py-32" style={{ background: "var(--cream-dark)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full"
                style={{ border: "1px solid var(--border-fine)" }}
              />
              <img
                src={HEART_IMAGE}
                alt="Dr. Bruno Mioto, Cardiologista"
                className="relative w-full object-cover"
                style={{ maxHeight: "520px", objectPosition: "center 30%" }}
              />
              {/* Credential badge */}
              <div
                className="absolute -bottom-6 -right-6 p-5 shadow-lg"
                style={{ background: "var(--medical-blue)", color: "white" }}
              >
                <div className="text-xs tracking-[0.15em] uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif", opacity: 0.8 }}>
                  CRM
                </div>
                <div className="font-serif text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  112007-SP
                </div>
              </div>
            </div>

            {/* Content side */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="editorial-line" />
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
                >
                  Sobre o Médico
                </span>
              </div>

              <h2
                className="font-serif mb-6 leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                Bruno Mahler Mioto
              </h2>

              <p
                className="mb-6 leading-relaxed"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.125rem",
                  color: "var(--ink-light)",
                  lineHeight: 1.8,
                }}
              >
                Médico cardiologista e clínico geral, Doutor em Ciências pela Universidade de São Paulo (USP) e Professor Colaborador da FMUSP.
                Atua na Unidade Clínica de Aterosclerose e Coronariopatia Crônica do InCor – HCFMUSP.
              </p>

              <p
                className="mb-8 leading-relaxed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9375rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.7,
                }}
              >
                Com mais de 19 mil seguidores no Instagram, o Dr. Bruno Mahler Mioto é referência em comunicação médica
                de qualidade, levando informações sobre saúde cardiovascular de forma clara e acessível ao público.
              </p>

              {/* RQE badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { label: "RQE 89316", desc: "Cardiologia" },
                  { label: "RQE 89317", desc: "Clínica Geral" },
                ].map((rqe) => (
                  <div
                    key={rqe.label}
                    className="px-4 py-2.5"
                    style={{
                      border: "1px solid var(--border-fine)",
                      background: "var(--cream)",
                    }}
                  >
                    <div className="text-xs font-medium" style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}>
                      {rqe.label}
                    </div>
                    <div className="text-xs" style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                      {rqe.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-5">
                {education.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="w-14 h-14 shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "var(--medical-blue-pale)",
                        color: "var(--medical-blue)",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.year}
                    </div>
                    <div>
                      <div
                        className="font-medium text-sm mb-0.5"
                        style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="servicos" className="py-24 lg:py-32" style={{ background: "var(--cream)" }}>
        <div className="container">
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="editorial-line" />
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
              >
                Especialidades
              </span>
            </div>
            <h2
              className="font-serif mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "var(--ink)",
              }}
            >
              Serviços & Procedimentos
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.125rem",
                color: "var(--ink-light)",
                lineHeight: 1.8,
              }}
            >
              Atendimento especializado em cardiologia e clínica geral, com foco na prevenção,
              diagnóstico preciso e tratamento humanizado.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border-fine)" }}>
            {services.map((service, i) => (
              <div
                key={i}
                className="p-8 group transition-colors"
                style={{ background: "var(--cream)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-dark)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--cream)")}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5 transition-colors"
                  style={{ background: "var(--medical-blue-pale)", color: "var(--medical-blue)" }}
                >
                  {service.icon}
                </div>
                <h3
                  className="font-serif font-semibold mb-3"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.125rem",
                    color: "var(--ink)",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Services image */}
          <div className="mt-16 relative overflow-hidden" style={{ height: "320px" }}>
            <img
              src={SERVICES_IMAGE}
              alt="Dr. Bruno Mioto em conferência médica"
              className="w-full h-full object-cover"
              style={{ opacity: 0.85 }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "var(--navy)", opacity: 0.65 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontStyle: "italic",
                    opacity: 0.9,
                  }}
                >
                  Tecnologia e humanidade a serviço da sua saúde
                </p>
                <button
                  onClick={() => scrollTo("#agendamento")}
                  className="px-6 py-3 text-sm font-medium text-white border border-white/40 hover:bg-white/10 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em" }}
                >
                  Agendar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AGENDAMENTO ── */}
      <AppointmentSection />

      {/* ── CONTATO ── */}
      <ContactSection />

      {/* ── BLOG ── */}
      <BlogSection />

      {/* ── LOCALIZAÇÃO ── */}
      <section id="localizacao" className="py-24 lg:py-32" style={{ background: "var(--cream-dark)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="editorial-line" />
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "var(--medical-blue)", fontFamily: "'Inter', sans-serif" }}
                >
                  Onde Estamos
                </span>
              </div>
              <h2
                className="font-serif mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                Localização & Contato
              </h2>

              <div className="flex flex-col gap-6">
                {[
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: "Endereço",
                    content: "R. Oscar Freire, 2250 Conj. 115\nPinheiros — São Paulo/SP",
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: "Telefone Fixo",
                    content: "(11) 3063-4890",
                    href: "tel:+551130634890",
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: "Telefone Celular",
                    content: "(11) 98285-0031",
                    href: "tel:+5511982850031",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    ),
                    title: "WhatsApp",
                    content: "(11) 94555-6605",
                    href: "https://wa.me/5511945556605",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: "Consultas Médicas",
                    content: "Seg, Ter, Qui e Sex: 13h30 às 19h30",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: "Secretaria (Presencial)",
                    content: "Seg a Sex: 8h30 às 19h30",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    ),
                    title: "Instagram",
                    content: "@brunomioto.cardiologista",
                    href: "https://instagram.com/brunomioto.cardiologista",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="w-10 h-10 shrink-0 flex items-center justify-center"
                      style={{ background: "var(--medical-blue-pale)", color: "var(--medical-blue)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div
                        className="text-xs tracking-[0.1em] uppercase mb-1"
                        style={{ color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.title}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium hover:underline"
                          style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}
                        >
                          {item.content}
                        </a>
                      ) : (
                        <div
                          className="font-medium whitespace-pre-line"
                          style={{ color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}
                        >
                          {item.content}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
              href="https://wa.me/5511945556605?text=Ol%C3%A1%2C%20Dr.%20Bruno!%20Gostaria%20de%20agendar%20uma%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: "#25D366", fontFamily: "'Inter', sans-serif" }}
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="relative" style={{ minHeight: "400px" }}>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "var(--cream-deeper)", border: "1px solid var(--border-fine)" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197!2d-46.68580!3d-23.56490!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57b5bfffffff%3A0x1!2sR.%20Oscar%20Freire%2C%202250%20-%20Pinheiros%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Clínica"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating widgets */}
      <WhatsAppButton />
      <AIChatWidget />
    </div>
  );
}
