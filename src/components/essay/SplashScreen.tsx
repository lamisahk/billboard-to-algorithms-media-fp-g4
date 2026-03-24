import { useEffect, useState, useMemo } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"stars" | "title" | "fade">("stars");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("title"), 600);
    const t2 = setTimeout(() => setPhase("fade"), 5600);
    const t3 = setTimeout(onComplete, 6200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 1.5,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-600"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #1a0a2e 0%, #0a0a0a 70%)",
        opacity: phase === "fade" ? 0 : 1,
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      {/* starfield */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            "--delay": `${s.delay}s`,
            "--duration": `${s.duration}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* title */}
      <div
        className="text-center px-6 transition-all duration-700"
        style={{
          opacity: phase === "stars" ? 0 : 1,
          transform: phase === "stars" ? "translateY(20px)" : "translateY(0)",
        }}
      >
        <p
          className="font-pixel text-[9px] md:text-[11px] tracking-[0.4em] mb-6"
          style={{ color: "hsl(330, 90%, 65%)" }}
        >
          A VISUAL ESSAY
        </p>
        <h1
          className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl"
          style={{ color: "white" }}
        >
          From Billboards to Algorithms
        </h1>
        <p
          className="font-serif text-sm md:text-lg italic max-w-xl mx-auto"
          style={{ color: "hsl(0, 0%, 60%)" }}
        >
          The Evolution of Advertising as Social Engineering (1980s–2020s)
        </p>

        {/* loading dots */}
        <div className="flex justify-center gap-2 mt-10">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background: "hsl(330, 90%, 55%)",
                animation: `loadingDot 1.2s ${i * 0.2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
