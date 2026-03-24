import { useEffect, useState, useCallback, useRef } from "react";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "literature", label: "Literature" },
  { id: "framework", label: "Framework" },
  { id: "mechanics", label: "Mechanics" },
  { id: "data-viz", label: "Data" },
  { id: "sector-01", label: "Wellness" },
  { id: "sector-02", label: "Business" },
  { id: "sector-03", label: "Investment" },
  { id: "sector-04", label: "Software" },
  { id: "sector-05", label: "Wearables" },
  { id: "timeline", label: "Timeline" },
  { id: "quiz", label: "Quiz" },
  { id: "comparative", label: "Analysis" },
  { id: "conclusion", label: "Conclusion" },
];

export default function TopNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [hovered, setHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    setVisible(window.scrollY > window.innerHeight * 0.5);

    const viewMid = window.innerHeight / 2;
    let bestId = "hero";
    let bestDist = Infinity;

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const dist = Math.abs(top - viewMid);
      if (top <= viewMid && dist < bestDist) {
        bestDist = dist;
        bestId = s.id;
      }
    });

    setActiveId(bestId);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-[3px] left-0 right-0 z-40 flex justify-center"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center gap-1 px-3 py-1.5 rounded-b-lg overflow-x-auto max-w-[95vw] scrollbar-none"
        style={{
          background: hovered ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.12)",
          backdropFilter: hovered ? "blur(12px)" : "blur(2px)",
          borderLeft: `1px solid ${hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)"}`,
          borderRight: `1px solid ${hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)"}`,
          borderBottom: `1px solid ${hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)"}`,
          borderTop: "none",
          transition: "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
        }}
      >
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="whitespace-nowrap px-2 py-1 rounded text-[10px] font-mono tracking-wider shrink-0 transition-all duration-200 hover:scale-105"
              style={{
                color: hovered
                  ? isActive ? "hsl(210, 60%, 70%)" : "rgba(255,255,255,0.45)"
                  : isActive ? "rgba(150, 190, 255, 0.3)" : "rgba(255,255,255,0.08)",
                background: hovered && isActive ? "rgba(100, 160, 255, 0.1)" : "transparent",
                fontWeight: isActive ? 600 : 400,
                transition: "color 0.5s ease, background 0.5s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive && hovered) e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
              onMouseLeave={(e) => {
                if (!isActive && hovered) e.currentTarget.style.color = "rgba(255,255,255,0.45)";
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
