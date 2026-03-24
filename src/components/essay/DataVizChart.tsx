import { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ====== DATA ====== */

const adSpendData = [
  { year: "1980", digital: 0, traditional: 20, recognition: 92 },
  { year: "1985", digital: 0, traditional: 35, recognition: 89 },
  { year: "1990", digital: 0, traditional: 55, recognition: 85 },
  { year: "1995", digital: 1, traditional: 70, recognition: 80 },
  { year: "2000", digital: 8, traditional: 80, recognition: 72 },
  { year: "2005", digital: 22, traditional: 78, recognition: 60 },
  { year: "2010", digital: 65, traditional: 72, recognition: 48 },
  { year: "2015", digital: 170, traditional: 68, recognition: 36 },
  { year: "2020", digital: 356, traditional: 55, recognition: 27 },
  { year: "2024", digital: 520, traditional: 45, recognition: 18 },
];

const annotations = [
  { year: "1995", label: "First banner ad" },
  { year: "2007", label: "Facebook Ads launch" },
  { year: "2016", label: "Native ads surpass display" },
];

/* ====== CUSTOM TOOLTIP ====== */

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg p-3 font-mono text-xs"
      style={{
        background: "rgba(0,0,0,0.9)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p className="font-bold mb-1" style={{ color: "white" }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.name === "Recognition" ? `${p.value}%` : `$${p.value}B`}
        </p>
      ))}
    </div>
  );
}

/* ====== COMPONENT ====== */

export default function DataVizChart() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState<"spend" | "recognition">("spend");
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollReveal<HTMLDivElement>(0.2);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 px-4" style={{ background: "#0a0a0f" }}>
      <div ref={headerRef} className="reveal-blur max-w-4xl mx-auto text-center mb-10">
        <p
          className="font-pixel text-[10px] tracking-[0.3em] mb-3"
          style={{ color: "hsl(var(--ig-green))" }}
        >
          DATA VISUALIZATION
        </p>
        <h3
          className="font-display text-3xl md:text-5xl font-bold mb-3"
          style={{ color: "white" }}
        >
          The Numbers Behind the Shift
        </h3>
        <p
          className="font-mono text-sm max-w-2xl mx-auto mb-8"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          As digital ad spending exploded, consumers' ability to recognize advertising collapsed.
        </p>

        {/* Toggle */}
        <div className="inline-flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
          <button
            onClick={() => setActiveMetric("spend")}
            className="px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300"
            style={{
              background: activeMetric === "spend" ? "hsl(var(--mac-blue-dark))" : "transparent",
              color: activeMetric === "spend" ? "white" : "rgba(255,255,255,0.4)",
            }}
          >
            Ad Spend ($B)
          </button>
          <button
            onClick={() => setActiveMetric("recognition")}
            className="px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300"
            style={{
              background: activeMetric === "recognition" ? "hsl(var(--mac-blue-dark))" : "transparent",
              color: activeMetric === "recognition" ? "white" : "rgba(255,255,255,0.4)",
            }}
          >
            Ad Recognition %
          </button>
        </div>
      </div>

      <div ref={containerRef} className="max-w-4xl mx-auto">
        <div
          className="rounded-xl p-6 md:p-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart data={adSpendData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <defs>
                <linearGradient id="gradDigital" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(330, 90%, 55%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(330, 90%, 55%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradTraditional" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(210, 60%, 55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(210, 60%, 55%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRecognition" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(145, 80%, 50%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(145, 80%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="year"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "IBM Plex Mono" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "IBM Plex Mono" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                label={{
                  value: activeMetric === "spend" ? "Billions ($)" : "Recognition %",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "IBM Plex Mono" },
                }}
              />
              <Tooltip content={<CustomTooltip />} />

              {annotations.map((a) => (
                <ReferenceLine
                  key={a.year}
                  x={a.year}
                  stroke="rgba(255,255,255,0.15)"
                  strokeDasharray="4 4"
                  label={{
                    value: a.label,
                    position: "top",
                    fill: "rgba(255,255,255,0.35)",
                    fontSize: 9,
                    fontFamily: "IBM Plex Mono",
                  }}
                />
              ))}

              {activeMetric === "spend" ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="traditional"
                    name="Traditional"
                    stroke="hsl(210, 60%, 55%)"
                    fill="url(#gradTraditional)"
                    strokeWidth={2}
                    isAnimationActive={isVisible}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                  <Area
                    type="monotone"
                    dataKey="digital"
                    name="Digital"
                    stroke="hsl(330, 90%, 55%)"
                    fill="url(#gradDigital)"
                    strokeWidth={2}
                    isAnimationActive={isVisible}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </>
              ) : (
                <Area
                  type="monotone"
                  dataKey="recognition"
                  name="Recognition"
                  stroke="hsl(145, 80%, 50%)"
                  fill="url(#gradRecognition)"
                  strokeWidth={2}
                  isAnimationActive={isVisible}
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            {activeMetric === "spend" ? (
              <>
                <span className="flex items-center gap-2 font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span className="w-3 h-[2px] inline-block" style={{ background: "hsl(210, 60%, 55%)" }} />
                  Traditional
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <span className="w-3 h-[2px] inline-block" style={{ background: "hsl(330, 90%, 55%)" }} />
                  Digital
                </span>
              </>
            ) : (
              <span className="flex items-center gap-2 font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span className="w-3 h-[2px] inline-block" style={{ background: "hsl(145, 80%, 50%)" }} />
                Consumers who can identify an ad
              </span>
            )}
          </div>
        </div>

        <p
          className="font-mono text-xs text-center mt-6 max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Sources: eMarketer, Statista, Van Reijmersdal et al. (2023). Recognition figures are composite estimates based on academic literature.
        </p>
      </div>
    </section>
  );
}
