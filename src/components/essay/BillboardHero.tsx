import { useEffect, useRef, useState, useMemo } from "react";
import scrollama from "scrollama";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = [
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-6 py-8 gap-3">
        <p className="font-pixel text-[8px] tracking-[0.3em] text-stone-400 uppercase">MCOM 103 · Group 4 (L51)</p>
        <h1 className="font-display text-3xl md:text-5xl font-black text-center tracking-tight leading-[1.1] text-stone-800">
          From Billboards<br />to Algorithms
        </h1>
        <p className="font-serif text-xs md:text-sm text-center italic text-stone-500 leading-relaxed max-w-xs">
          The Evolution of Advertising<br />as Social Engineering (1980s–2020s)
        </p>
        <div className="flex gap-1.5 mt-1">
          <div className="w-10 h-1 rounded-full bg-amber-400/70" />
          <div className="w-10 h-1 rounded-full bg-rose-400/70" />
          <div className="w-10 h-1 rounded-full bg-violet-400/70" />
        </div>
      </div>
    ),
    caption: null,
  },
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-10 py-10 gap-3">
        <p className="font-serif text-3xl md:text-5xl font-bold text-center italic text-stone-700 leading-tight">
          "Pinch an inch?"
        </p>
        <div className="w-16 h-px bg-stone-300 my-1" />
        <p className="font-mono text-[10px] md:text-xs text-stone-400 tracking-wider">
          Kellogg's Special K, 1985
        </p>
      </div>
    ),
    caption: "You are watching TV. There is a commercial break. You know it is an ad. It announces itself.",
  },
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-10 py-10 gap-4">
        <p className="font-display text-3xl md:text-4xl font-bold text-center tracking-wide leading-snug text-stone-700">
          THERE WAS A<br />
          <span className="text-stone-900 text-4xl md:text-5xl">STRUCTURE.</span>
        </p>
        <div className="flex gap-2 mt-2">
          <div className="w-10 h-1.5 rounded-full bg-amber-300" />
          <div className="w-10 h-1.5 rounded-full bg-rose-300" />
          <div className="w-10 h-1.5 rounded-full bg-violet-300" />
        </div>
      </div>
    ),
    caption: "There was a clear boundary between content and commercial. You could, and often did, look away.",
  },
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-10 py-10 gap-2">
        <p className="font-display text-2xl md:text-3xl font-bold text-center tracking-wide text-stone-500">
          SOMETHING
        </p>
        <p className="font-display text-4xl md:text-6xl font-black text-center tracking-tight text-stone-900">
          CHANGED.
        </p>
      </div>
    ),
    caption: "Between these two eras, advertising did not just change its format.",
  },
  {
    billboard: "glitch",
    caption: "It dissolved into the infrastructure of daily life and stopped looking like advertising at all.",
  },
  {
    billboard: "phone",
    caption: "The ad is your friend's recommendation. You cannot look away. You do not know you are looking.",
  },
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-10 py-10 gap-4">
        <p className="font-display text-2xl md:text-3xl font-bold text-center tracking-wide text-stone-800">
          SAME MISSION.
        </p>
        <p className="font-serif text-xl md:text-2xl text-center italic text-stone-400">
          Invisible methods.
        </p>
        <div className="flex gap-2 mt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-rose-300 to-violet-400 opacity-60" />
          ))}
        </div>
      </div>
    ),
    caption: "Five industries. Forty years. The methods evolved. The mission did not.",
  },
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-10 py-10 gap-3">
        <p className="font-mono text-lg text-stone-300 animate-bounce">↓</p>
        <p className="font-display text-xl md:text-3xl font-bold text-center tracking-wide text-stone-700">
          Scroll to begin
        </p>
        <p className="font-serif text-base md:text-lg text-center italic text-stone-400">
          the investigation.
        </p>
      </div>
    ),
    caption: null,
  },
];

function PhoneMockup() {
  return (
    <div className="phone-mockup mx-auto" style={{ width: 200, height: 380, borderRadius: 26, padding: '10px 6px' }}>
      <div className="phone-screen" style={{ borderRadius: 18 }}>
        <div className="flex items-center gap-2 px-3 pt-3 pb-2">
          <div className="ig-avatar-ring w-7 h-7 flex items-center justify-center">
            <div className="ig-avatar-inner w-full h-full">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-400 to-amber-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[9px] font-semibold">your.friend</span>
            <span className="text-gray-400 text-[7px]">Sponsored</span>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-b from-violet-900/40 to-rose-900/20 flex items-center justify-center">
          <p className="text-white/50 text-[8px] font-mono text-center px-4 leading-relaxed">
            "You need this.<br />Trust me."
          </p>
        </div>
        <div className="flex gap-3 px-3 py-2">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
        </div>
      </div>
    </div>
  );
}

export default function BillboardHero() {
  const [currentStep, setCurrentStep] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(STEPS.length - 1, index));
    setCurrentStep(clamped);
    if (clamped === 4) {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 1200);
    }
    // Scroll to the matching step element
    const stepEl = stepsRef.current?.querySelectorAll(".hero-step")[clamped];
    stepEl?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 50}%`,
      size: Math.random() * 2 + 0.5,
      duration: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  useEffect(() => {
    const scroller = scrollama();
    scroller
      .setup({
        step: ".hero-step",
        offset: 0.5,
      })
      .onStepEnter(({ index }: { index: number }) => {
        setCurrentStep(index);
        if (index === 4) {
          setGlitching(true);
          setTimeout(() => setGlitching(false), 1200);
        }
      });

    return () => scroller.destroy();
  }, []);

  const isModern = currentStep >= 5;

  const skyGradient = isModern
    ? 'linear-gradient(180deg, #1a0a2e 0%, #2d1654 30%, #4a1942 60%, #1a0a2e 100%)'
    : 'linear-gradient(180deg, #0f172a 0%, #1e293b 20%, #44403c 55%, #92785c 80%, #d4a574 95%, #e8c9a0 100%)';

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky scene */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{
          background: skyGradient,
          transition: 'background 2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              '--duration': star.duration,
              '--delay': star.delay,
              opacity: isModern && parseFloat(star.top) > 35 ? 0 : undefined,
              transition: 'opacity 1.5s ease',
            } as React.CSSProperties}
          />
        ))}

        {/* Soft glow on horizon */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            bottom: '22%',
            width: '70%',
            height: '20%',
            background: isModern
              ? 'radial-gradient(ellipse, rgba(147, 51, 234, 0.15), transparent 70%)'
              : 'radial-gradient(ellipse, rgba(232, 201, 160, 0.3), transparent 70%)',
            transition: 'background 2s ease',
            zIndex: 1,
          }}
        />

        {/* Power lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
          <line x1="0" y1="62%" x2="100%" y2="58%" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
          <line x1="0" y1="65%" x2="100%" y2="61%" stroke="rgba(0,0,0,0.15)" strokeWidth="0.75" />
        </svg>

        {/* Horizon silhouette */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '32%',
            background: isModern ? '#0d0d15' : '#121210',
            clipPath: 'polygon(0 35%, 8% 30%, 15% 33%, 22% 26%, 30% 28%, 38% 20%, 45% 24%, 52% 18%, 60% 22%, 68% 16%, 75% 20%, 82% 14%, 88% 18%, 95% 12%, 100% 16%, 100% 100%, 0 100%)',
            zIndex: 3,
            transition: 'background 2s ease',
          }}
        />

        {/* Road */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: '100%',
            height: '28%',
            background: 'linear-gradient(180deg, #1a1a18 0%, #111110 100%)',
            clipPath: 'polygon(43% 0%, 57% 0%, 82% 100%, 18% 100%)',
            zIndex: 4,
          }}
        />

        {/* Road dashes */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ height: '26%', zIndex: 5, paddingTop: '2%' }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 2,
                height: `${8 + i * 3}px`,
                background: `rgba(200, 180, 100, ${0.15 + i * 0.05})`,
              }}
            />
          ))}
        </div>

        {/* Billboard structure - centered */}
        <div
          className="relative flex flex-col items-center"
          style={{ zIndex: 10, marginBottom: '8%' }}
        >
          {/* Soft lamp glow */}
          <div
            className="w-72 md:w-[480px] h-3 rounded-full mb-1"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,220,150,0.25), transparent)',
              boxShadow: '0 4px 30px rgba(255,200,100,0.12)',
            }}
          />

          {/* Billboard face - larger */}
          <div
            className={`billboard-face w-72 md:w-[480px] h-44 md:h-64 flex items-center justify-center ${glitching ? 'animate-glitch' : ''}`}
            style={{
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {currentStep === 4 && !glitching ? (
              <PhoneMockup />
            ) : currentStep === 5 ? (
              <PhoneMockup />
            ) : typeof STEPS[currentStep]?.billboard === 'string' ? (
              <div className="flex items-center justify-center h-full">
                <p className="font-display text-xl text-center text-stone-400">...</p>
              </div>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                key={currentStep}
                style={{
                  animation: 'fadeInBillboard 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {STEPS[currentStep]?.billboard}
              </div>
            )}
          </div>

          {/* Posts */}
          <div className="flex justify-between w-44 md:w-64">
            <div className="billboard-post h-20 md:h-28" style={{ transform: 'rotate(-1deg)' }} />
            <div className="billboard-post h-20 md:h-28" style={{ transform: 'rotate(1deg)' }} />
          </div>

          {/* Ground shadow */}
          <div
            className="w-52 md:w-72 h-2 rounded-full mt-1"
            style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.35), transparent)' }}
          />
        </div>

        {/* Prev/Next arrows */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4" style={{ zIndex: 25, bottom: STEPS[currentStep]?.caption ? '6rem' : '2.5rem' }}>
          <button
            onClick={() => goTo(currentStep - 1)}
            disabled={currentStep === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: currentStep === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
              color: currentStep === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.6)',
              cursor: currentStep === 0 ? 'default' : 'pointer',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {currentStep + 1} / {STEPS.length}
          </span>
          <button
            onClick={() => goTo(currentStep + 1)}
            disabled={currentStep === STEPS.length - 1}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: currentStep === STEPS.length - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
              color: currentStep === STEPS.length - 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.6)',
              cursor: currentStep === STEPS.length - 1 ? 'default' : 'pointer',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Scroll cue */}
        {currentStep === 0 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center" style={{ zIndex: 25 }}>
            <p className="font-mono text-lg text-white/40 animate-bounce">↓</p>
            <p className="font-mono text-[9px] tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
              scroll slowly
            </p>
          </div>
        )}

        {/* Caption overlay */}
        {STEPS[currentStep]?.caption && (
          <div
            className="caption-overlay absolute bottom-10 left-1/2 -translate-x-1/2 max-w-lg mx-auto px-7 py-5 rounded-2xl"
            style={{
              zIndex: 20,
              animation: 'fadeInCaption 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            key={`caption-${currentStep}`}
          >
            <span
              className="inline-block font-pixel text-[8px] tracking-wider mb-2 px-2.5 py-1 rounded-full"
              style={{
                background: currentStep <= 3
                  ? 'rgba(212, 165, 116, 0.25)'
                  : currentStep <= 5
                  ? 'rgba(168, 85, 247, 0.25)'
                  : 'rgba(244, 114, 182, 0.25)',
                color: currentStep <= 3
                  ? '#d4a574'
                  : currentStep <= 5
                  ? '#a855f7'
                  : '#f472b6',
              }}
            >
              {currentStep <= 3 ? '1980s' : currentStep <= 5 ? '2020s' : 'THE SHIFT'}
            </span>
            <p className="text-white/90 font-sans text-sm md:text-base leading-relaxed">
              {STEPS[currentStep].caption}
            </p>
          </div>
        )}
      </div>

      {/* Scrollama steps */}
      <div ref={stepsRef} className="relative" style={{ zIndex: 30 }}>
        {STEPS.map((_, i) => (
          <div key={i} className={`hero-step scroll-step ${currentStep === i ? 'is-active' : ''}`}>
            <div className="w-4 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
