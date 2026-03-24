import { useEffect, useState, useCallback, useRef } from "react";

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
  const prevActiveRef = useRef(0);
  const [transitioning, setTransitioning] = useState(false);

  const update = useCallback(() => {
    setVisible(window.scrollY > window.innerHeight * 0.8);

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

    if (bestIndex !== prevActiveRef.current) {
      setTransitioning(true);
      prevActiveRef.current = bestIndex;
      setTimeout(() => setTransitioning(false), 300);
    }
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
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-0"
      style={{ transition: 'opacity 0.4s', opacity: visible ? 1 : 0 }}
    >
      {/* Spine line */}
      <div
        className="absolute left-[7px] top-[7px] w-[2px] rounded-full"
        style={{
          height: `calc(100% - 14px)`,
          background: 'rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="w-full rounded-full"
          style={{
            height: `${spineProgress}%`,
            background: 'linear-gradient(180deg, hsl(var(--mac-blue-light)), hsl(var(--mac-blue-dark)))',
            transition: 'height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      {chapters.map((ch, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;

        return (
          <div
            key={ch.id}
            className="relative flex items-center py-[6px] cursor-pointer group"
            onClick={() => scrollTo(ch.id)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Dot */}
            <div
              className="w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: isActive
                  ? 'hsl(var(--mac-blue-light))'
                  : isPast
                  ? 'hsl(var(--mac-blue-light) / 0.5)'
                  : 'rgba(255,255,255,0.2)',
                background: isActive ? 'hsl(var(--mac-blue-dark))' : 'transparent',
                boxShadow: isActive
                  ? '0 0 8px hsl(var(--mac-blue-light)), 0 0 20px hsl(var(--mac-blue-light) / 0.25)'
                  : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isActive && transitioning ? 'scale(1.3)' : 'scale(1)',
              }}
            >
              {isPast && (
                <div
                  className="w-[6px] h-[6px] rounded-full"
                  style={{
                    background: 'hsl(var(--mac-blue-light) / 0.6)',
                    transition: 'opacity 0.3s ease',
                  }}
                />
              )}
            </div>

            {/* Label */}
            <span
              className="absolute left-6 whitespace-nowrap font-mono text-[10px] tracking-wider px-2 py-1 rounded pointer-events-none"
              style={{
                opacity: hoveredIndex === i ? 1 : 0,
                transform: hoveredIndex === i ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                background: 'rgba(0,0,0,0.85)',
                color: isActive ? 'hsl(var(--ig-pink))' : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {ch.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
