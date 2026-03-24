import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_hsl(210_60%_55%/0.6)]"
      style={{
        background: 'hsl(215 70% 30%)',
        boxShadow: '0 0 12px hsl(210 60% 55% / 0.4)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <ArrowUp size={18} color="white" />
    </button>
  );
}
