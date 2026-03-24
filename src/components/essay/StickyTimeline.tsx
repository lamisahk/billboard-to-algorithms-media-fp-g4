import { useState, useEffect, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ====== TIMELINE DATA ====== */

const steps = [
  {
    era: "1980s",
    title: "The Ad Is Obvious",
    description: "Commercial breaks, magazine spreads, billboards. You always knew when you were being sold to.",
    sectors: [
      { name: "Wellness", detail: "Special K airs in clearly marked daytime TV commercial breaks" },
      { name: "Business", detail: "IBM's Little Tramp runs during Super Bowl ad slots" },
      { name: "Investment", detail: "E.F. Hutton places recognizable print ads in business magazines" },
      { name: "Software", detail: "Lotus 1-2-3 runs as obvious spec sheets in trade publications" },
      { name: "Wearables", detail: "Casio features Bert Parks in direct product demonstrations" },
    ],
    visibility: 95,
    color: "hsl(var(--mac-blue-light))",
  },
  {
    era: "1990s",
    title: "The Boundary Blurs",
    description: "Product placement enters Hollywood. Infomercials disguise themselves as talk shows. The first banner ad appears.",
    sectors: [
      { name: "Wellness", detail: "Diet products appear as segments within talk shows" },
      { name: "Business", detail: "Microsoft embeds product demonstrations within news coverage" },
      { name: "Investment", detail: "Financial products sponsor educational TV programming" },
      { name: "Software", detail: "AOL distributes free trial CDs — product as content" },
      { name: "Wearables", detail: "Early fitness trackers marketed through infomercial formats" },
    ],
    visibility: 75,
    color: "hsl(38, 95%, 55%)",
  },
  {
    era: "2000s",
    title: "The Algorithm Arrives",
    description: "Google AdWords. Facebook targeting. Ads begin following individuals, not demographics.",
    sectors: [
      { name: "Wellness", detail: "Search ads target people Googling specific health conditions" },
      { name: "Business", detail: "LinkedIn enables targeting by job title and company size" },
      { name: "Investment", detail: "Online brokers retarget users who visited financial pages" },
      { name: "Software", detail: "SaaS companies pioneer content marketing as native advertising" },
      { name: "Wearables", detail: "Fitbit seeds devices with influencers for 'organic' reviews" },
    ],
    visibility: 50,
    color: "hsl(var(--ig-amber))",
  },
  {
    era: "2010s",
    title: "The Ad Becomes Content",
    description: "Influencer marketing. Sponsored posts. Native advertising indistinguishable from editorial.",
    sectors: [
      { name: "Wellness", detail: "Noom spends $21M/month on behaviorally targeted Instagram ads" },
      { name: "Business", detail: "MasterClass trailers are formatted as cinematic documentaries" },
      { name: "Investment", detail: "Robinhood's app is the ad — engagement is the product" },
      { name: "Software", detail: "Notion embeds within influencer tutorials as recommendations" },
      { name: "Wearables", detail: "Oura Ring appears in biohacking content as peer advice" },
    ],
    visibility: 25,
    color: "hsl(var(--ig-pink))",
  },
  {
    era: "2020s",
    title: "The Ad Is Invisible",
    description: "Behavioral engineering. Predictive targeting. The ad arrives as your own idea.",
    sectors: [
      { name: "Wellness", detail: "Ozempic's most powerful effect comes from cultural conversation advertising seeded" },
      { name: "Business", detail: "Monday.com retargets across all platforms after initial exposure" },
      { name: "Investment", detail: "Coinbase's QR code contains no commercial information at all" },
      { name: "Software", detail: "ChatGPT's ad is a 22-second demo — the product speaks for itself" },
      { name: "Wearables", detail: "Apple Watch '911' ad uses real emergency calls — no product shown" },
    ],
    visibility: 10,
    color: "hsl(270, 60%, 55%)",
  },
];

/* ====== COMPONENT ====== */

export default function StickyTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollReveal<HTMLDivElement>(0.2);

  const handleScroll = useCallback(() => {
    if (!stepsRef.current) return;
    const stepEls = stepsRef.current.querySelectorAll("[data-step]");
    const viewMid = window.innerHeight * 0.5;
    let best = 0;
    let bestDist = Infinity;

    stepEls.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height / 2 - viewMid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });

    setActiveStep(best);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const current = steps[activeStep];

  return (
    <section className="py-20 px-4" style={{ background: "#0a0a0f" }}>
      <div ref={headerRef} className="reveal-blur max-w-4xl mx-auto text-center mb-16">
        <p className="font-pixel text-[10px] tracking-[0.3em] mb-3" style={{ color: "hsl(var(--ig-amber))" }}>
          SCROLLAMA TIMELINE
        </p>
        <h3 className="font-display text-3xl md:text-5xl font-bold mb-3" style={{ color: "white" }}>
          The Disappearing Act
        </h3>
        <p className="font-mono text-sm max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
          Scroll to watch advertising dissolve from obvious interruption into invisible infrastructure.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="md:grid md:grid-cols-[1fr_1fr] md:gap-12 relative">
          {/* Sticky graphic — left */}
          <div className="hidden md:block">
            <div className="sticky top-[20vh]">
              {/* Visibility meter */}
              <div
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderLeft: `1px solid ${current.color}33`,
                  borderRight: `1px solid ${current.color}33`,
                  borderTop: `1px solid ${current.color}33`,
                  borderBottom: `1px solid ${current.color}33`,
                  transition: "border-color 0.5s ease",
                }}
              >
                <p className="font-pixel text-[9px] tracking-[0.3em] mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                  COMMERCIAL INTENT VISIBILITY
                </p>

                {/* Big percentage */}
                <div className="text-center mb-6">
                  <span
                    className="font-display text-7xl font-bold inline-block"
                    style={{
                      color: current.color,
                      transition: "color 0.5s ease",
                    }}
                  >
                    {current.visibility}%
                  </span>
                  <p className="font-mono text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    of audience can identify the ad
                  </p>
                </div>

                {/* Bar */}
                <div className="h-3 rounded-full overflow-hidden mb-6" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${current.visibility}%`,
                      background: current.color,
                      transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s ease",
                      boxShadow: `0 0 12px ${current.color}`,
                    }}
                  />
                </div>

                {/* Sector breakdown */}
                <div className="space-y-2">
                  {current.sectors.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-2 px-3 rounded-lg"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        opacity: 0,
                        animation: `fadeIn 0.4s ${i * 80}ms ease forwards`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: current.color }}
                      />
                      <div>
                        <span className="font-mono text-[10px] font-bold block" style={{ color: current.color }}>
                          {s.name}
                        </span>
                        <span className="font-mono text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                          {s.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Era dots */}
              <div className="flex justify-center gap-2 mt-4">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: i === activeStep ? s.color : "rgba(255,255,255,0.15)",
                      transition: "background 0.3s ease",
                      boxShadow: i === activeStep ? `0 0 8px ${s.color}` : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll steps — right */}
          <div ref={stepsRef} className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={i}
                data-step={i}
                className="min-h-[70vh] flex items-center"
              >
                <div
                  className="rounded-xl p-6 md:p-8 w-full"
                  style={{
                    background: i === activeStep ? "rgba(255,255,255,0.04)" : "transparent",
                    border: `1px solid ${i === activeStep ? "rgba(255,255,255,0.1)" : "transparent"}`,
                    transition: "all 0.5s ease",
                    opacity: i === activeStep ? 1 : 0.3,
                  }}
                >
                  <span
                    className="font-pixel text-[10px] tracking-[0.3em] block mb-2"
                    style={{ color: step.color }}
                  >
                    {step.era}
                  </span>
                  <h4
                    className="font-display text-2xl md:text-3xl font-bold mb-3"
                    style={{ color: "white" }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="font-mono text-sm leading-relaxed mb-4"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {step.description}
                  </p>

                  {/* Mobile: show sectors inline */}
                  <div className="md:hidden space-y-2 mt-4">
                    <p className="font-mono text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                      ACROSS SECTORS:
                    </p>
                    {step.sectors.map((s, j) => (
                      <p key={j} className="font-mono text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        <span style={{ color: step.color }}>{s.name}:</span> {s.detail}
                      </p>
                    ))}
                  </div>

                  {/* Mobile visibility bar */}
                  <div className="md:hidden mt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 rounded-full flex-1" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${step.visibility}%`, background: step.color }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold" style={{ color: step.color }}>
                        {step.visibility}%
                      </span>
                    </div>
                    <p className="font-mono text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                      visibility of commercial intent
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline keyframes for sector fade-in */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
