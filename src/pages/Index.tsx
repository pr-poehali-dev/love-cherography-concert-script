import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SHOW_IMAGE = "https://cdn.poehali.dev/projects/dbf0d60f-43a1-48c1-8272-8958ff7beb9d/files/49c2d0e2-b4e7-4832-8d95-6d90192aac3d.jpg";

// Тип элемента программы
type ProgramItem =
  | { kind: "number"; num: number; title: string; note?: string }
  | { kind: "bg"; num: number; for: string }
  | { kind: "special"; num: number; title: string };

const SHOW_TITLE = "Кто любит — тот любим";
const SHOW_YEAR = "Открытый урок 2026";

// Подробный поминутный план (занавес закрыт до открытия)
const DETAILED: ProgramItem[] = [
  { kind: "special", num: 0,  title: "Открытие — фонограмма, занавес открывается" },
  { kind: "number",  num: 1,  title: "Калинка" },
  { kind: "number",  num: 2,  title: "Калинка (уход)" },
  { kind: "bg",      num: 3,  for: "Калинка — фото на экране" },
  { kind: "number",  num: 4,  title: "Мир спаленки" },
  { kind: "bg",      num: 5,  for: "Мир спаленки" },
  { kind: "number",  num: 6,  title: "Рожь" },
  { kind: "bg",      num: 7,  for: "Рожь" },
  { kind: "bg",      num: 8,  for: "Галчата" },
  { kind: "bg",      num: 9,  for: "Созвездие" },
  { kind: "number",  num: 10, title: "Созвездие" },
  { kind: "bg",      num: 11, for: "Кулинары" },
  { kind: "number",  num: 12, title: "Кулинары" },
  { kind: "bg",      num: 13, for: "Постигая глубины морей" },
  { kind: "number",  num: 14, title: "Постигая глубины морей" },
  { kind: "bg",      num: 15, for: "Не разлучные" },
  { kind: "number",  num: 16, title: "Дуэт «Не разлучные»" },
  { kind: "bg",      num: 17, for: "Куклы" },
  { kind: "number",  num: 18, title: "Куклы" },
  { kind: "bg",      num: 19, for: "Дела кошачьи" },
  { kind: "number",  num: 20, title: "Дела кошачьи" },
  { kind: "bg",      num: 21, for: "Хрупкая красота" },
  { kind: "number",  num: 22, title: "Хрупкая красота" },
  { kind: "bg",      num: 23, for: "Свет в оконце / За тобой" },
  { kind: "number",  num: 24, title: "За тобой" },
  { kind: "bg",      num: 25, for: "Свет в оконце" },
  { kind: "number",  num: 26, title: "За тобой / Свет в оконце" },
  { kind: "bg",      num: 27, for: "Мир в наших руках" },
  { kind: "number",  num: 28, title: "Мир в наших руках" },
  { kind: "bg",      num: 29, for: "Весёлые нотки" },
  { kind: "number",  num: 30, title: "Весёлые нотки" },
  { kind: "bg",      num: 31, for: "Ритм жизни" },
  { kind: "number",  num: 32, title: "Ритм жизни" },
  { kind: "bg",      num: 33, for: "Папино тепло" },
  { kind: "number",  num: 34, title: "Папино тепло" },
  { kind: "number",  num: 35, title: "Женщине не место на войне" },
  { kind: "special", num: 36, title: "Слово родителям" },
  { kind: "special", num: 37, title: "Выход выпускников" },
  { kind: "special", num: 38, title: "Награждение выпускников" },
  { kind: "special", num: 39, title: "Финал — выход с кубками" },
  { kind: "special", num: 40, title: "Гимн — Валенсия" },
];

// Секции для отображения
const PROGRAM = [
  {
    type: "prologue",
    label: "Открытие",
    icon: "Sparkles",
    color: "#D4A843",
    title: "Занавес закрыт",
    description: "Звучит фонограмма. На словах открывается занавес — шоу начинается!",
    items: [0],
  },
  {
    type: "act",
    label: "Часть I",
    icon: "Flame",
    color: "#E05747",
    title: "Первые номера",
    description: "Калинка, Мир спаленки, Рожь, Галчата, Созвездие",
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    type: "act",
    label: "Часть II",
    icon: "Star",
    color: "#7B68EE",
    title: "В мире образов",
    description: "Кулинары, Постигая глубины морей, Не разлучные, Куклы, Дела кошачьи",
    items: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  },
  {
    type: "act",
    label: "Часть III",
    icon: "Zap",
    color: "#20B2AA",
    title: "Красота и чувства",
    description: "Хрупкая красота, За тобой, Свет в оконце, Мир в наших руках",
    items: [21, 22, 23, 24, 25, 26, 27, 28],
  },
  {
    type: "act",
    label: "Часть IV",
    icon: "Music",
    color: "#C77DFF",
    title: "Энергия и тепло",
    description: "Весёлые нотки, Ритм жизни, Папино тепло, Женщине не место на войне",
    items: [29, 30, 31, 32, 33, 34, 35],
  },
  {
    type: "finale",
    label: "Финал",
    icon: "Trophy",
    color: "#D4A843",
    title: "Апофеоз",
    description: "Слово родителям, выход и награждение выпускников, гимн Валенсия",
    items: [36, 37, 38, 39, 40],
  },
];

const typeColors: Record<string, { bg: string; border: string; glow: string }> = {
  prologue: { bg: "rgba(212,168,67,0.12)", border: "rgba(212,168,67,0.4)", glow: "rgba(212,168,67,0.3)" },
  act: { bg: "rgba(26,15,20,0.8)", border: "rgba(255,255,255,0.08)", glow: "rgba(255,255,255,0.05)" },
  intermission: { bg: "rgba(139,115,85,0.1)", border: "rgba(139,115,85,0.3)", glow: "rgba(139,115,85,0.1)" },
  finale: { bg: "rgba(212,168,67,0.18)", border: "rgba(212,168,67,0.6)", glow: "rgba(212,168,67,0.4)" },
};

function Particle({ x, delay, color }: { x: number; delay: number; color: string }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        bottom: "20%",
        backgroundColor: color,
        animation: `particle-float ${3 + Math.random() * 4}s ease-out ${delay}s infinite`,
      }}
    />
  );
}

function DetailRow({ item }: { item: ProgramItem }) {
  const [hovered, setHovered] = useState(false);

  if (item.kind === "bg") {
    return (
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200"
        style={{
          background: hovered ? "rgba(255,255,255,0.03)" : "transparent",
          borderLeft: "2px solid rgba(255,255,255,0.06)",
          marginLeft: "4px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          className="flex-shrink-0 font-sans text-xs w-7 text-right"
          style={{ color: "rgba(180,155,90,0.35)", fontSize: "0.68rem", fontWeight: 500 }}
        >
          {item.num}
        </span>
        <Icon name="Music2" size={12} style={{ color: "rgba(180,155,90,0.3)", flexShrink: 0 }} />
        <span
          className="font-sans text-xs italic"
          style={{ color: "rgba(180,155,90,0.45)", fontSize: "0.78rem" }}
        >
          Фоновая музыка — {item.for}
        </span>
      </div>
    );
  }

  if (item.kind === "special") {
    return (
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
        style={{
          background: hovered ? "rgba(212,168,67,0.1)" : "rgba(212,168,67,0.04)",
          border: `1px solid ${hovered ? "rgba(212,168,67,0.35)" : "rgba(212,168,67,0.12)"}`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          className="flex-shrink-0 font-sans text-xs w-7 text-right"
          style={{ color: "#A07828", fontSize: "0.68rem", fontWeight: 600 }}
        >
          {item.num}
        </span>
        <Icon name="Star" size={13} style={{ color: "#D4A843", flexShrink: 0 }} />
        <span
          className="font-display"
          style={{ color: hovered ? "#F0C96A" : "#D4A843", fontSize: "1rem", fontWeight: 600 }}
        >
          {item.title}
        </span>
      </div>
    );
  }

  // kind === "number"
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-default"
      style={{
        background: hovered ? "rgba(212,168,67,0.07)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(212,168,67,0.3)" : "rgba(255,255,255,0.05)"}`,
        transform: hovered ? "translateX(4px)" : "translateX(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs transition-all duration-200"
        style={{
          background: hovered ? "rgba(212,168,67,0.25)" : "rgba(212,168,67,0.1)",
          color: "#D4A843",
          fontWeight: 700,
          fontSize: "0.72rem",
        }}
      >
        {item.num}
      </div>
      <span
        className="font-display"
        style={{
          color: hovered ? "#F0C96A" : "#E8D5A3",
          fontSize: "1.05rem",
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        {item.title}
      </span>
      {item.note && (
        <span className="font-sans text-xs ml-auto" style={{ color: "rgba(180,155,90,0.5)", fontSize: "0.7rem", flexShrink: 0 }}>
          {item.note}
        </span>
      )}
    </div>
  );
}

function SectionCard({ section, index }: { section: typeof PROGRAM[0]; index: number }) {
  const [expanded, setExpanded] = useState(true);
  const colors = typeColors[section.type] || typeColors.act;
  const isFinale = section.type === "finale";
  const isPrologue = section.type === "prologue";

  const sectionItems = section.items.map((n) => DETAILED.find((d) => d.num === n)).filter(Boolean) as ProgramItem[];

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 0 40px ${colors.glow}`,
      }}
    >
      {(isFinale || isPrologue) && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${section.color}18 0%, transparent 60%)` }}
        />
      )}

      <div
        className="flex items-center justify-between p-5 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${section.color}20`, border: `1px solid ${section.color}40` }}
          >
            <Icon name={section.icon} size={20} style={{ color: section.color }} />
          </div>
          <div>
            <span
              className="font-sans text-xs uppercase tracking-widest block"
              style={{ color: section.color, letterSpacing: "0.15em", fontSize: "0.66rem", fontWeight: 600 }}
            >
              {section.label}
            </span>
            <h3
              className="font-display"
              style={{
                color: isFinale ? "#F0C96A" : isPrologue ? "#E8D5A3" : "#D4C4A0",
                fontSize: "1.25rem",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {section.title}
            </h3>
          </div>
        </div>
        <div
          className="transition-transform duration-300 flex-shrink-0"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <Icon name="ChevronDown" size={18} style={{ color: "rgba(255,255,255,0.25)" }} />
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5">
          <p
            className="font-sans text-xs mb-4"
            style={{ color: "rgba(180,160,120,0.55)", fontSize: "0.8rem", lineHeight: 1.6 }}
          >
            {section.description}
          </p>
          <div className="space-y-1.5">
            {sectionItems.map((item) => (
              <DetailRow key={item.num} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [curtainLifted, setCurtainLifted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCurtainLifted(true), 400);
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const totalDuration = "2+ часа";

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: "#0A0608", color: "#E8D5A3" }}
    >
      <style>{`
        @keyframes particle-float {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.8; }
          100% { transform: translateY(-120px) rotate(540deg) scale(0); opacity: 0; }
        }
        @keyframes curtain-lift {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @keyframes text-reveal {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes line-expand {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #A07828 0%, #F0C96A 30%, #D4A843 50%, #F0C96A 70%, #A07828 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .curtain-panel {
          animation: ${curtainLifted ? "curtain-lift 1.4s cubic-bezier(0.76, 0, 0.24, 1) forwards" : "none"};
        }
        .text-reveal-1 { animation: text-reveal 0.8s ease-out 0.8s both; }
        .text-reveal-2 { animation: text-reveal 0.8s ease-out 1.1s both; }
        .text-reveal-3 { animation: text-reveal 0.8s ease-out 1.4s both; }
        .text-reveal-4 { animation: text-reveal 0.8s ease-out 1.7s both; }
        .number-reveal { animation: text-reveal 0.6s ease-out both; }
        .line-reveal {
          animation: line-expand 1s ease-out 1.6s both;
          display: block;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0608; }
        ::-webkit-scrollbar-thumb { background: rgba(212,168,67,0.3); border-radius: 2px; }
      `}</style>

      {/* Curtain */}
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        <div
          className="curtain-panel absolute inset-0"
          style={{ background: "linear-gradient(180deg, #1A0010 0%, #0D0008 100%)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div style={{ color: "rgba(212,168,67,0.3)", fontSize: "4rem" }}>✦</div>
          </div>
        </div>
      </div>

      {/* Sticky nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,6,8,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(212,168,67,0.15)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="shimmer-text font-display text-lg" style={{ fontWeight: 600 }}>
            {SHOW_TITLE}
          </span>
          <div className="flex items-center gap-6">
            <a href="#program" className="font-sans text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: "rgba(200,175,120,0.6)", letterSpacing: "0.12em", fontSize: "0.68rem" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(200,175,120,0.6)")}
            >
              Программа
            </a>
            <a href="#info" className="font-sans text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: "rgba(200,175,120,0.6)", letterSpacing: "0.12em", fontSize: "0.68rem" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(200,175,120,0.6)")}
            >
              Детали
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={SHOW_IMAGE}
            alt="Театральное шоу"
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(10,6,8,0.5) 0%, rgba(10,6,8,0.1) 40%, rgba(10,6,8,0.7) 80%, rgba(10,6,8,1) 100%)",
            }}
          />
        </div>

        {/* Spotlight effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute"
            style={{
              top: "-10%",
              left: "20%",
              width: "40vw",
              height: "80vh",
              background: "radial-gradient(ellipse at top, rgba(212,168,67,0.12) 0%, transparent 60%)",
              animation: "spotlight 4s ease-in-out infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              top: "-10%",
              right: "15%",
              width: "35vw",
              height: "70vh",
              background: "radial-gradient(ellipse at top, rgba(192,57,43,0.1) 0%, transparent 60%)",
              animation: "spotlight 4s ease-in-out 2s infinite",
            }}
          />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <Particle
              key={i}
              x={5 + i * 6}
              delay={i * 0.4}
              color={i % 3 === 0 ? "#D4A843" : i % 3 === 1 ? "#C0392B" : "rgba(255,255,255,0.5)"}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="text-reveal-1 mb-4 flex items-center justify-center gap-3">
            <div style={{ height: "1px", width: "60px", background: "rgba(212,168,67,0.5)" }} />
            <span
              className="font-sans uppercase tracking-widest text-xs"
              style={{ color: "#D4A843", letterSpacing: "0.25em", fontSize: "0.72rem" }}
            >
              {SHOW_YEAR}
            </span>
            <div style={{ height: "1px", width: "60px", background: "rgba(212,168,67,0.5)" }} />
          </div>

          <h1
            className="text-reveal-2 shimmer-text font-display mb-4"
            style={{
              fontSize: "clamp(2.2rem, 8vw, 6rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Кто любит —<br />
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>тот любим</span>
          </h1>

          <p
            className="text-reveal-3 font-display italic"
            style={{
              color: "rgba(200,180,140,0.8)",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              fontWeight: 300,
              marginBottom: "2.5rem",
            }}
          >
            Открытый урок · 2026
          </p>

          <div
            className="text-reveal-4 flex flex-wrap items-center justify-center gap-6"
            style={{ marginBottom: "3rem" }}
          >
            {[
              { icon: "Clock", label: totalDuration },
              { icon: "Music", label: "40 номеров" },
              { icon: "Users", label: "Весь ансамбль" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon name={icon} size={14} style={{ color: "#D4A843" }} />
                <span className="font-sans text-sm" style={{ color: "rgba(200,180,140,0.75)", fontSize: "0.82rem" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#program"
            className="text-reveal-4 inline-flex items-center gap-3 font-sans uppercase tracking-widest text-xs transition-all duration-300 group"
            style={{
              color: "#0A0608",
              background: "linear-gradient(135deg, #D4A843, #F0C96A)",
              padding: "14px 32px",
              borderRadius: "4px",
              letterSpacing: "0.18em",
              fontSize: "0.72rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(212,168,67,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <Icon name="ArrowDown" size={14} />
            Смотреть программу
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: "float 3s ease-in-out infinite", animationDelay: "2s" }}
        >
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, rgba(212,168,67,0.5))" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(212,168,67,0.5)" }} />
        </div>
      </section>

      {/* Stats bar */}
      <div
        style={{ background: "rgba(212,168,67,0.06)", borderTop: "1px solid rgba(212,168,67,0.12)", borderBottom: "1px solid rgba(212,168,67,0.12)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "2+ часа", label: "Продолжительность" },
            { value: "40", label: "Позиций программы" },
            { value: "4 части", label: "+ Финал" },
            { value: "2026", label: "Открытый урок" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="shimmer-text font-display" style={{ fontSize: "1.8rem", fontWeight: 600, lineHeight: 1 }}>
                {value}
              </div>
              <div className="font-sans text-xs mt-1 uppercase tracking-widest" style={{ color: "rgba(180,160,110,0.5)", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program */}
      <section id="program" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span
            className="font-sans text-xs uppercase tracking-widest block mb-3"
            style={{ color: "#D4A843", letterSpacing: "0.2em", fontSize: "0.68rem" }}
          >
            ✦ Программа вечера ✦
          </span>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 600, color: "#E8D5A3" }}
          >
            Кто любит — <span className="shimmer-text">тот любим</span>
          </h2>
        </div>

        <div className="space-y-4">
          {PROGRAM.map((section, i) => (
            <SectionCard key={section.label} section={section} index={i} />
          ))}
        </div>
      </section>

      {/* Info block */}
      <section id="info" className="max-w-5xl mx-auto px-6 pb-20">
        <div
          className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background: "rgba(212,168,67,0.06)",
            border: "1px solid rgba(212,168,67,0.2)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,168,67,0.08) 0%, transparent 60%)" }}
          />
          <div className="relative z-10">
            <div className="text-5xl mb-4">✦</div>
            <h3
              className="font-display mb-3"
              style={{ fontSize: "2rem", color: "#E8D5A3", fontWeight: 600 }}
            >
              Праздник, который останется в сердце
            </h3>
            <p
              className="font-sans max-w-xl mx-auto"
              style={{ color: "rgba(200,175,130,0.7)", fontSize: "0.9rem", lineHeight: 1.8 }}
            >
              Открытый урок 2026 — это большой праздник танца, где каждый номер наполнен
              теплом, любовью и красотой. Занавес закрыт. Всё начинается.
            </p>
            <div
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {["Калинка", "Созвездие", "Куклы", "Ритм жизни", "Валенсия"].map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-xs px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(212,168,67,0.08)",
                    border: "1px solid rgba(212,168,67,0.2)",
                    color: "rgba(212,168,67,0.8)",
                    fontSize: "0.75rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t text-center py-8 px-6"
        style={{ borderColor: "rgba(212,168,67,0.1)" }}
      >
        <div className="shimmer-text font-display text-xl mb-2" style={{ fontWeight: 600 }}>
          Кто любит — тот любим
        </div>
        <p className="font-sans text-xs" style={{ color: "rgba(160,140,100,0.4)", fontSize: "0.7rem" }}>
          Открытый урок · 2026
        </p>
      </footer>
    </div>
  );
}