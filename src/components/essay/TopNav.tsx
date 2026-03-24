import { useEffect, useState, useCallback } from "react";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "literature", label: "Literature" },
  { id: "framework", label: "Framework" },
  { id: "mechanics", label: "Mechanics" },
  { id: "sector-01", label: "Wellness" },
  { id: "sector-02", label: "Business" },
  { id: "sector-03", label: "Investment" },
  { id: "sector-04", label: "Software" },
  { id: "sector-05", label: "Wearables" },
  { id: "comparative", label: "Analysis" },
  { id: "conclusion", label: "Conclusion" },
];

export default function TopNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState("hero");

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
      className="fixed top-[3px] left-0 right-0 z-40 flex justify-center"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      <div
        className="flex items-center gap-1 px-3 py-1.5 rounded-b-lg overflow-x-auto max-w-[95vw] scrollbar-none"
        style={{
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderTop: "none",
        }}
      >
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="whitespace-nowrap px-2 py-1 rounded text-[10px] font-mono tracking-wider transition-all duration-300 shrink-0"
              style={{
                color: isActive ? "hsl(210, 60%, 70%)" : "rgba(255,255,255,0.45)",
                background: isActive ? "rgba(210, 60%, 55%, 0.12)" : "transparent",
                fontWeight: isActive ? 600 : 400,
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
