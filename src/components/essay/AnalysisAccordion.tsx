import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AnalysisDimension {
  label: string;
  content: string;
}

interface AnalysisAccordionProps {
  dimensions: AnalysisDimension[];
  variant?: "mac" | "ig";
}

export default function AnalysisAccordion({ dimensions, variant = "mac" }: AnalysisAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const isIg = variant === "ig";

  return (
    <div className={isIg ? "analysis-panel rounded-b-lg" : "mt-4 border-t border-gray-200"}>
      <p className="font-pixel text-[9px] tracking-wider px-4 pt-3 pb-1" style={{ color: isIg ? '#888' : '#666' }}>
        FIVE-DIMENSION ANALYSIS
      </p>
      {dimensions.map((dim, i) => (
        <div key={i} className="last:border-b-0" style={{ borderBottom: `1px solid ${isIg ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}` }}>
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
            style={{ background: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.background = isIg ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <span className="font-mono text-sm font-semibold" style={{ color: isIg ? 'rgba(255,255,255,0.85)' : '#333' }}>
              {dim.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
              style={{ color: isIg ? 'rgba(255,255,255,0.3)' : '#9ca3af' }}
            />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4">
              <p className="font-mono text-sm leading-relaxed" style={{ color: isIg ? 'rgba(255,255,255,0.7)' : '#444' }}>
                {dim.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
