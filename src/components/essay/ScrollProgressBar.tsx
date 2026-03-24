import { useEffect, useState } from "react";

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
      <div className="h-[3px] w-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, hsl(215 70% 30%), hsl(210 60% 55%), hsl(215 70% 30%))',
            backgroundSize: '200% 100%',
            animation: 'shimmerBar 2s linear infinite',
            boxShadow: '0 0 8px hsl(210 60% 55% / 0.5), 0 0 20px hsl(215 70% 30% / 0.3)',
            transition: 'width 60ms linear',
          }}
        />
      </div>
    </div>
  );
}
