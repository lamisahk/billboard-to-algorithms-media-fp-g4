import { useEffect, useState, useCallback } from "react";

const chapters = [
  { id: "hero", label: "Intro" },
  { id: "literature", label: "Literature" },
  { id: "framework", label: "Framework" },
  { id: "mechanics", label: "Mechanics" },
  { id: "sector-01", label: "Wellness" },
  { id: "sector-02", label: "Business" },
  { id: "sector-03", label: "Investment" },
  { id: "sector-04", label: "Software" },
  { id: "sector-05", label: "Wearables" },
  { id: "comparative", label: "Comparative" },
  { id: "conclusion", label: "Conclusion" },
];

export default function ChapterNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const update = useCallback(() => {
    // Show after hero (past first viewport)
    setVisible(window.scrollY > window.innerHeight * 0.8);

    // Find which section is most in view
    let bestIndex = 0;
    let bestTop = Infinity;
    const viewMid = window.innerHeight / 2;

    chapters.forEach((ch, i) => {
      const el = document.getElementById(ch.id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.top - viewMid);
      if (rect.top <= viewMid && dist < bestTop) {
        bestTop = dist;
        bestIndex = i;
      }
    });
    setActiveIndex(bestIndex);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  if (!visible) return null;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const spineProgress = chapters.length > 1 ? (activeIndex / (chapters.length - 1)) * 100 : 0;

  return (
    <nav
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-0"
      style={{ transition: 'opacity 0.4s', opacity: visible ? 1 : 0 }}
    >
      {/* Spine line */}
      <div
        className="absolute left-[7px] top-[7px] w-[2px] rounded-full"
        style={{
          height: `calc(100% - 14px)`,
          background: 'rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="w-full rounded-full transition-all duration-300"
          style={{
            height: `${spineProgress}%`,
            background: 'hsl(330, 90%, 55%)',
          }}
        />
      </div>

      {chapters.map((ch, i) => (
        <div
          key={ch.id}
          className="relative flex items-center py-[6px] cursor-pointer group"
          onClick={() => scrollTo(ch.id)}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Dot */}
          <div
            className="w-[16px] h-[16px] rounded-full border-2 transition-all duration-300 flex items-center justify-center"
            style={{
              borderColor: i === activeIndex ? 'hsl(330, 90%, 55%)' : 'rgba(255,255,255,0.25)',
              background: i === activeIndex ? 'hsl(330, 90%, 55%)' : 'transparent',
              boxShadow: i === activeIndex ? '0 0 8px hsl(330, 90%, 55%), 0 0 16px hsl(330, 90%, 55% / 0.3)' : 'none',
            }}
          >
            {i <= activeIndex && i !== activeIndex && (
              <div className="w-[6px] h-[6px] rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
            )}
          </div>

          {/* Label (slides in on hover) */}
          <span
            className="absolute left-6 whitespace-nowrap font-mono text-[10px] tracking-wider px-2 py-1 rounded transition-all duration-200 pointer-events-none"
            style={{
              opacity: hoveredIndex === i ? 1 : 0,
              transform: hoveredIndex === i ? 'translateX(0)' : 'translateX(-8px)',
              background: 'rgba(0,0,0,0.8)',
              color: i === activeIndex ? 'hsl(330, 90%, 65%)' : 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {ch.label}
          </span>
        </div>
      ))}
    </nav>
  );
}
