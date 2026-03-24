import { ReactNode } from "react";

interface MacWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function MacWindow({ title, children, className = "" }: MacWindowProps) {
  return (
    <div className={`mac-window rounded-sm max-w-3xl mx-auto transition-all duration-300 hover:shadow-[4px_4px_20px_rgba(0,0,0,0.45)] hover:translate-y-[-2px] ${className}`}>
      <div className="mac-titlebar">
        <div className="mac-titlebar-buttons">
          <div className="mac-titlebar-btn" />
          <div className="mac-titlebar-btn" />
        </div>
        <span className="mac-titlebar-label text-xs">{title}</span>
      </div>
      <div className="mac-body">
        {children}
      </div>
    </div>);

}