import { useEffect, useRef, useState, useMemo } from "react";
import scrollama from "scrollama";

const STEPS = [
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-6 py-8 gap-3">
        <h1 className="font-display text-3xl md:text-5xl font-extrabold text-center tracking-wide leading-tight" style={{ color: '#1a1a1a' }}>
          FROM BILLBOARDS<br />TO ALGORITHMS
        </h1>
        <p className="font-pixel text-[9px] md:text-[10px] tracking-widest mt-2" style={{ color: '#555' }}>
          MCOM 103, Group 4 (L51)
        </p>
      </div>
    ),
    caption: null,
  },
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-6 py-6 gap-2">
        <p className="font-display text-2xl md:text-4xl font-bold text-center" style={{ color: '#1a1a1a' }}>
          "PINCH AN INCH?"
        </p>
        <p className="font-mono text-xs md:text-sm mt-2" style={{ color: '#666' }}>
          Kellogg's Special K, 1985
        </p>
      </div>
    ),
    caption: "You are watching TV. There is a commercial break. You know it is an ad. It announces itself.",
  },
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-6 py-8">
        <p className="font-display text-2xl md:text-4xl font-bold text-center tracking-wide" style={{ color: '#1a1a1a' }}>
          THERE WAS A STRUCTURE.
        </p>
      </div>
    ),
    caption: "There was a clear boundary between content and commercial. You could, and often did, look away.",
  },
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-6 py-8">
        <p className="font-display text-2xl md:text-4xl font-bold text-center tracking-wide" style={{ color: '#1a1a1a' }}>
          SOMETHING CHANGED.
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
      <div className="flex flex-col items-center justify-center h-full px-6 py-8 gap-2">
        <p className="font-display text-xl md:text-3xl font-bold text-center tracking-wide" style={{ color: '#1a1a1a' }}>
          SAME MISSION.
        </p>
        <p className="font-display text-lg md:text-2xl font-semibold text-center tracking-wide" style={{ color: '#888' }}>
          Invisible methods.
        </p>
      </div>
    ),
    caption: "Five industries. Forty years. The methods evolved. The mission did not.",
  },
  {
    billboard: (
      <div className="flex flex-col items-center justify-center h-full px-6 py-8">
        <p className="font-display text-xl md:text-3xl font-bold text-center tracking-wide" style={{ color: '#1a1a1a' }}>
          SAME MISSION.
        </p>
        <p className="font-display text-lg md:text-2xl font-semibold text-center tracking-wide mt-1" style={{ color: '#888' }}>
          Invisible methods.
        </p>
      </div>
    ),
    caption: "Scroll to begin the investigation.",
  },
];

function PhoneMockup() {
  return (
    <div className="phone-mockup mx-auto">
      <div className="phone-screen">
        <div className="flex items-center gap-2 px-3 pt-3 pb-2">
          <div className="ig-avatar-ring w-8 h-8 flex items-center justify-center">
            <div className="ig-avatar-inner w-full h-full">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-ig-pink to-ig-amber" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[10px] font-semibold">your.friend</span>
            <span className="text-gray-400 text-[8px]">Sponsored</span>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-b from-purple-900/50 to-purple-800/30 flex items-center justify-center">
          <p className="text-white/60 text-[9px] font-mono text-center px-4">
            "You need this. Trust me."
          </p>
        </div>
        <div className="flex gap-4 px-3 py-2">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
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

  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 55}%`,
      size: Math.random() * 2 + 1,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 4}s`,
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

  const skyPurple = currentStep >= 5;

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky scene */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background: skyPurple
            ? 'linear-gradient(180deg, #0d0221 0%, #2d1b69 40%, #1a0a3e 100%)'
            : 'linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 30%, #2d1f0e 70%, #8b5e3c 90%, #c2884d 100%)',
          transition: 'background 1.5s ease',
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
              opacity: skyPurple && parseFloat(star.top) > 40 ? 0 : undefined,
            } as React.CSSProperties}
          />
        ))}

        {/* Power lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
          <line x1="0" y1="62%" x2="100%" y2="58%" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
          <line x1="0" y1="65%" x2="100%" y2="61%" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
        </svg>

        {/* Horizon silhouette */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '35%',
            background: '#0a0a0a',
            clipPath: 'polygon(0 30%, 5% 25%, 12% 28%, 20% 20%, 28% 22%, 35% 15%, 42% 18%, 50% 12%, 58% 16%, 65% 10%, 72% 14%, 78% 8%, 85% 12%, 92% 6%, 100% 10%, 100% 100%, 0 100%)',
            zIndex: 3,
          }}
        />

        {/* Road */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: '100%',
            height: '30%',
            background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
            clipPath: 'polygon(42% 0%, 58% 0%, 85% 100%, 15% 100%)',
            zIndex: 4,
          }}
        />

        {/* Road center line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: '2px',
            height: '28%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(200,180,100,0.4) 100%)',
            zIndex: 5,
          }}
        />

        {/* Billboard structure */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ bottom: '30%', zIndex: 10 }}
        >
          {/* Lamp bar */}
          <div className="billboard-lamp-bar w-64 md:w-96 mb-1" />

          {/* Billboard face */}
          <div
            className={`billboard-face w-60 md:w-[360px] h-36 md:h-52 flex items-center justify-center ${glitching ? 'animate-glitch' : ''}`}
          >
            {currentStep === 4 && !glitching ? (
              <PhoneMockup />
            ) : currentStep === 5 ? (
              <PhoneMockup />
            ) : typeof STEPS[currentStep]?.billboard === 'string' ? (
              <div className="flex items-center justify-center h-full">
                <p className="font-display text-xl text-center" style={{ color: '#1a1a1a' }}>...</p>
              </div>
            ) : (
              STEPS[currentStep]?.billboard
            )}
          </div>

          {/* Posts */}
          <div className="flex justify-between w-40 md:w-60">
            <div className="billboard-post h-20 md:h-28" style={{ transform: 'rotate(-2deg)' }} />
            <div className="billboard-post h-20 md:h-28" style={{ transform: 'rotate(2deg)' }} />
          </div>

          {/* Ground shadow */}
          <div
            className="w-48 md:w-72 h-3 rounded-full mt-1"
            style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.4), transparent)' }}
          />
        </div>

        {/* Caption overlay */}
        {STEPS[currentStep]?.caption && (
          <div
            className="caption-overlay absolute bottom-8 left-1/2 -translate-x-1/2 max-w-xl mx-auto px-6 py-4 rounded-lg"
            style={{ zIndex: 20 }}
          >
            <span className="inline-block font-pixel text-[8px] tracking-wider mb-2 px-2 py-1 rounded"
              style={{ background: 'rgba(236, 72, 153, 0.3)', color: '#ec4899' }}>
              {currentStep <= 3 ? '1980s' : currentStep <= 5 ? '2020s' : 'THE SHIFT'}
            </span>
            <p className="text-white font-sans text-sm md:text-base leading-relaxed">
              {STEPS[currentStep].caption}
            </p>
          </div>
        )}
      </div>

      {/* Scrollama steps */}
      <div ref={stepsRef} className="relative" style={{ zIndex: 30 }}>
        {STEPS.map((_, i) => (
          <div key={i} className={`hero-step scroll-step ${currentStep === i ? 'is-active' : ''}`}>
            <div className="w-4 h-4" /> {/* invisible trigger */}
          </div>
        ))}
      </div>
    </div>
  );
}
