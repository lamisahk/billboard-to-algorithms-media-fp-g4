import { useEffect, useState } from "react";
import { Monitor, Smartphone, BookOpen, TrendingUp, Cpu } from "lucide-react";

const milestones = [
  { at: 9, icon: BookOpen, label: "Literature" },
  { at: 36, icon: Monitor, label: "Wellness" },
  { at: 54, icon: TrendingUp, label: "Investment" },
  { at: 72, icon: Cpu, label: "Software" },
  { at: 90, icon: Smartphone, label: "Wearables" },
];

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Track */}
      <div className="h-[3px] w-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, hsl(var(--ig-pink)), hsl(var(--ig-amber)), hsl(var(--ig-green)))',
            boxShadow: '0 0 8px hsl(var(--ig-pink) / 0.4), 0 0 20px hsl(var(--ig-pink) / 0.15)',
            transition: 'width 60ms linear',
          }}
        />
      </div>

      {/* Milestone icons — hidden on mobile */}
      <div className="hidden md:block">
        {milestones.map((m) => {
          const reached = progress >= m.at;
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="absolute top-[6px] -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${m.at}%` }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: reached ? 'hsl(var(--ig-pink))' : 'rgba(255,255,255,0.1)',
                  boxShadow: reached ? '0 0 6px hsl(var(--ig-pink) / 0.5)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: reached ? 'scale(1)' : 'scale(0.8)',
                  opacity: reached ? 1 : 0.3,
                }}
              >
                <Icon size={10} color="white" strokeWidth={2.5} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
