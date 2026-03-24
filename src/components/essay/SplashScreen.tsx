import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(onDone, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const opacity = phase === "enter" ? 0 : phase === "hold" ? 1 : 0;
  const blur = phase === "hold" ? 0 : 12;
  const scale = phase === "enter" ? 0.92 : phase === "hold" ? 1 : 1.06;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "#000",
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {/* Starfield background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() > 0.7 ? 2 : 1,
              height: Math.random() > 0.7 ? 2 : 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              "--delay": `${Math.random() * 3}s`,
              "--duration": `${2 + Math.random() * 3}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative flex flex-col items-center gap-5"
        style={{
          opacity,
          filter: `blur(${blur}px)`,
          transform: `scale(${scale})`,
          transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Decorative bars */}
        <div className="flex gap-1.5">
          <div className="w-10 h-1 rounded-full bg-amber-400/70" />
          <div className="w-10 h-1 rounded-full bg-rose-400/70" />
          <div className="w-10 h-1 rounded-full bg-violet-400/70" />
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-black text-center tracking-tight leading-[1.1] text-white">
          From Billboards
          <br />
          to Algorithms
        </h1>

        <p className="font-serif text-sm md:text-base text-center italic text-white/50 leading-relaxed max-w-xs">
          The Evolution of Advertising
          <br />
          as Social Engineering (1980s–2020s)
        </p>

        {/* Loading indicator */}
        <div className="mt-4 flex items-center gap-2">
          <div className="splash-dot" style={{ animationDelay: "0s" }} />
          <div className="splash-dot" style={{ animationDelay: "0.2s" }} />
          <div className="splash-dot" style={{ animationDelay: "0.4s" }} />
        </div>

        <p className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase mt-2">
          MCOM 103 · Group 4
        </p>
      </div>
    </div>
  );
}
