import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SHOW_IMAGE = "https://cdn.poehali.dev/projects/dbf0d60f-43a1-48c1-8272-8958ff7beb9d/files/49c2d0e2-b4e7-4832-8d95-6d90192aac3d.jpg";

const PROGRAM = [
  {
    type: "prologue",
    label: "Пролог",
    icon: "Sparkles",
    color: "#D4A843",
    time: "19:00",
    duration: "15 мин",
    title: "Рождение Праздника",
    description: "Торжественное открытие. Занавес медленно раздвигается — и мир наполняется светом, музыкой и движением.",
    numbers: [
      { num: 1, title: "Увертюра", style: "Классический балет", music: "Открывающая тема", duration: "5 мин" },
      { num: 2, title: "Танец рассвета", style: "Современный танец", music: "Оркестровая композиция", duration: "10 мин" },
    ],
  },
  {
    type: "act",
    label: "Акт I",
    icon: "Flame",
    color: "#E05747",
    time: "19:15",
    duration: "45 мин",
    title: "Огонь Вдохновения",
    description: "Стремительные ритмы, яркие краски и неудержимая энергия первого акта захватывают дух с первых секунд.",
    numbers: [
      { num: 3, title: "Вихрь страсти", style: "Фламенко + современный", music: "Ваша песня 1", duration: "8 мин" },
      { num: 4, title: "Игра огней", style: "Характерный танец", music: "Ваша песня 2", duration: "7 мин" },
      { num: 5, title: "Полёт", style: "Классический балет", music: "Ваша песня 3", duration: "10 мин" },
      { num: 6, title: "Ритм города", style: "Контемпорари", music: "Ваша песня 4", duration: "12 мин" },
      { num: 7, title: "Вместе мы сила", style: "Групповой номер", music: "Ваша песня 5", duration: "8 мин" },
    ],
  },
  {
    type: "intermission",
    label: "Антракт",
    icon: "Coffee",
    color: "#8B7355",
    time: "20:00",
    duration: "20 мин",
    title: "Пауза для вдохновения",
    description: "Время насладиться атмосферой праздника, пообщаться и подготовиться ко второму акту.",
    numbers: [],
  },
  {
    type: "act",
    label: "Акт II",
    icon: "Star",
    color: "#7B68EE",
    time: "20:20",
    duration: "50 мин",
    title: "Лирика Мечты",
    description: "Нежность, лиризм и глубина — второй акт уносит зрителей в мир грёз и сокровенных чувств.",
    numbers: [
      { num: 8, title: "Лунный свет", style: "Лирический балет", music: "Ваша песня 6", duration: "10 мин" },
      { num: 9, title: "Нежность", style: "Pas de deux", music: "Ваша песня 7", duration: "12 мин" },
      { num: 10, title: "Детские мечты", style: "Характерный танец", music: "Ваша песня 8", duration: "8 мин" },
      { num: 11, title: "Путь к звёздам", style: "Современный танец", music: "Ваша песня 9", duration: "12 мин" },
      { num: 12, title: "Единство", style: "Смешанные стили", music: "Ваша песня 10", duration: "8 мин" },
    ],
  },
  {
    type: "act",
    label: "Акт III",
    icon: "Zap",
    color: "#20B2AA",
    time: "21:10",
    duration: "35 мин",
    title: "Триумф Радости",
    description: "Кульминация праздника! Все стили сливаются в единый поток торжества и ликования.",
    numbers: [
      { num: 13, title: "Карнавал", style: "Смешанные стили", music: "Ваша песня 11", duration: "10 мин" },
      { num: 14, title: "Встреча двух миров", style: "Балет + контемпорари", music: "Ваша песня 12", duration: "12 мин" },
      { num: 15, title: "Взрыв красок", style: "Все исполнители", music: "Ваша песня 13", duration: "13 мин" },
    ],
  },
  {
    type: "finale",
    label: "Финал",
    icon: "Trophy",
    color: "#D4A843",
    time: "21:45",
    duration: "30 мин",
    title: "Апофеоз",
    description: "Грандиозный финальный номер объединяет всех участников на сцене. Кульминация всего шоу — взрыв радости, красоты и торжества!",
    numbers: [
      { num: 16, title: "Все вместе", style: "Гранд-ансамбль", music: "Финальная тема", duration: "15 мин" },
      { num: 17, title: "Поклоны и овации", style: "Церемония", music: "Праздничный марш", duration: "15 мин" },
    ],
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

function NumberCard({ item }: { item: { num: number; title: string; style: string; music: string; duration: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden"
      style={{
        background: hovered ? "rgba(212,168,67,0.08)" : "rgba(255,255,255,0.02)",
        borderColor: hovered ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.06)",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4 p-4">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-sans font-700 text-sm transition-all duration-300"
          style={{
            background: hovered ? "rgba(212,168,67,0.3)" : "rgba(212,168,67,0.12)",
            color: "#D4A843",
            fontWeight: 700,
          }}
        >
          {item.num}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4
              className="font-display text-base leading-tight"
              style={{ color: hovered ? "#F0C96A" : "#E8D5A3", fontWeight: 600, fontSize: "1.05rem" }}
            >
              {item.title}
            </h4>
            <span
              className="flex-shrink-0 text-xs font-sans px-2 py-0.5 rounded-full"
              style={{ background: "rgba(212,168,67,0.1)", color: "#A07828", fontSize: "0.7rem" }}
            >
              {item.duration}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span
              className="text-xs font-sans"
              style={{ color: "rgba(180,160,120,0.7)", fontSize: "0.72rem" }}
            >
              {item.style}
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.6rem" }}>•</span>
            <span
              className="text-xs font-sans italic"
              style={{ color: "rgba(160,140,100,0.6)", fontSize: "0.72rem" }}
            >
              {item.music}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ section, index }: { section: typeof PROGRAM[0]; index: number }) {
  const [expanded, setExpanded] = useState(section.type !== "intermission");
  const colors = typeColors[section.type] || typeColors.act;
  const isFinale = section.type === "finale";
  const isPrologue = section.type === "prologue";
  const isIntermission = section.type === "intermission";

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 0 40px ${colors.glow}`,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {(isFinale || isPrologue) && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${section.color}18 0%, transparent 60%)`,
          }}
        />
      )}

      <div
        className="flex items-center justify-between p-6 cursor-pointer select-none"
        onClick={() => !isIntermission && setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${section.color}20`, border: `1px solid ${section.color}40` }}
          >
            <Icon name={section.icon} size={22} style={{ color: section.color }} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span
                className="font-sans text-xs font-600 uppercase tracking-widest"
                style={{ color: section.color, letterSpacing: "0.15em", fontSize: "0.68rem", fontWeight: 600 }}
              >
                {section.label}
              </span>
              <span
                className="font-sans text-xs"
                style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}
              >
                {section.time} · {section.duration}
              </span>
            </div>
            <h3
              className="font-display mt-0.5"
              style={{
                color: isFinale ? "#F0C96A" : isPrologue ? "#E8D5A3" : "#D4C4A0",
                fontSize: "1.35rem",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {section.title}
            </h3>
          </div>
        </div>
        {!isIntermission && (
          <div
            className="transition-transform duration-300 flex-shrink-0"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <Icon name="ChevronDown" size={18} style={{ color: "rgba(255,255,255,0.3)" }} />
          </div>
        )}
      </div>

      {expanded && (
        <div className="px-6 pb-6">
          <p
            className="font-sans text-sm leading-relaxed mb-5"
            style={{ color: "rgba(200,180,140,0.75)", fontSize: "0.85rem", lineHeight: 1.7 }}
          >
            {section.description}
          </p>

          {section.numbers.length > 0 && (
            <div className="space-y-2">
              {section.numbers.map((n) => (
                <NumberCard key={n.num} item={n} />
              ))}
            </div>
          )}
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

  const totalNumbers = PROGRAM.reduce((sum, s) => sum + s.numbers.length, 0);
  const totalDuration = "2 ч 35 мин";

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
            Праздник Танца
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
              Грандиозное шоу
            </span>
            <div style={{ height: "1px", width: "60px", background: "rgba(212,168,67,0.5)" }} />
          </div>

          <h1
            className="text-reveal-2 shimmer-text font-display mb-4"
            style={{
              fontSize: "clamp(3rem, 10vw, 7rem)",
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            Праздник<br />
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>Танца</span>
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
            Классический балет · Современный танец · Характерные номера
          </p>

          <div
            className="text-reveal-4 flex flex-wrap items-center justify-center gap-6"
            style={{ marginBottom: "3rem" }}
          >
            {[
              { icon: "Clock", label: totalDuration },
              { icon: "Music", label: `${totalNumbers} номеров` },
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
            { value: "17", label: "Номеров" },
            { value: "3", label: "Акта + Финал" },
            { value: "19:00", label: "Начало" },
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
            Путешествие через <span className="shimmer-text">танец</span>
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
              Вечер, который останется в сердце
            </h3>
            <p
              className="font-sans max-w-xl mx-auto"
              style={{ color: "rgba(200,175,130,0.7)", fontSize: "0.9rem", lineHeight: 1.8 }}
            >
              Масштабное шоу объединяет красоту классического балета, экспрессию современного танца
              и яркость характерных номеров в единое незабываемое действо.
            </p>
            <div
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {["Классический балет", "Современный танец", "Характерные номера", "Гранд-финал"].map((tag) => (
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
          Праздник Танца
        </div>
        <p className="font-sans text-xs" style={{ color: "rgba(160,140,100,0.4)", fontSize: "0.7rem" }}>
          Классический балет · Современный танец · Характерные номера
        </p>
      </footer>
    </div>
  );
}