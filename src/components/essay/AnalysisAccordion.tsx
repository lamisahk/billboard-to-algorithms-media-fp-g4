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

  return (
    <div className={variant === "ig" ? "analysis-panel rounded-b-lg" : "mt-4 border-t border-gray-200"}>
      <p className="font-pixel text-[9px] tracking-wider px-4 pt-3 pb-1" style={{ color: variant === "ig" ? '#888' : '#666' }}>
        FIVE-DIMENSION ANALYSIS
      </p>
      {dimensions.map((dim, i) => (
        <div key={i} className="border-b border-gray-200 last:border-b-0">
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-mono text-sm font-semibold" style={{ color: '#333' }}>
              {dim.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform text-gray-400 ${openIndex === i ? 'rotate-180' : ''}`}
            />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4">
              <p className="font-mono text-sm leading-relaxed" style={{ color: '#444' }}>
                {dim.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
