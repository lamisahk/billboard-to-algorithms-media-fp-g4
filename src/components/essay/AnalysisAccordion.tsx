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
    <div
      className="mt-4 rounded-b-lg"
      style={{
        background: isIg ? '#1a1a2e' : 'transparent',
        borderTop: isIg ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb',
      }}
    >
      <p
        className="font-pixel text-[9px] tracking-wider px-4 pt-3 pb-1"
        style={{ color: isIg ? 'rgba(255,255,255,0.5)' : '#666' }}
      >
        FIVE-DIMENSION ANALYSIS
      </p>
      {dimensions.map((dim, i) => (
        <div
          key={i}
          className="last:border-b-0"
          style={{ borderBottom: `1px solid ${isIg ? 'rgba(255,255,255,0.08)' : '#e5e7eb'}` }}
        >
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200"
            style={{ background: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isIg ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)';
              e.currentTarget.style.paddingLeft = '20px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.paddingLeft = '16px';
            }}
          >
            <span
              className="font-mono text-sm font-semibold transition-colors duration-200"
              style={{ color: isIg ? 'rgba(255,255,255,0.9)' : '#333' }}
            >
              {dim.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
              style={{ color: isIg ? 'rgba(255,255,255,0.4)' : '#9ca3af' }}
            />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4">
              <p
                className="font-mono text-sm leading-relaxed"
                style={{ color: isIg ? 'rgba(255,255,255,0.75)' : '#444' }}
              >
                {dim.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
