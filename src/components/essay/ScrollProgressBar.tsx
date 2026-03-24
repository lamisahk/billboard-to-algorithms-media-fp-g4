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
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50" style={{ background: 'rgba(255,255,255,0.1)' }}>
      <div
        className="h-full transition-[width] duration-75"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, hsl(330, 90%, 55%), hsl(38, 95%, 55%), hsl(145, 80%, 50%))'
        }}
      />
    </div>
  );
}
