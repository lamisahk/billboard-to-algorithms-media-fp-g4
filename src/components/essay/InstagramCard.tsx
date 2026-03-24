import { ReactNode } from "react";
import AnalysisAccordion from "./AnalysisAccordion";

interface InstagramCardProps {
  username: string;
  sponsored?: boolean;
  verified?: boolean;
  children: ReactNode;
  caption?: string;
  dimensions: { label: string; content: string }[];
}

export default function InstagramCard({
  username,
  sponsored = true,
  verified = false,
  children,
  caption,
  dimensions,
}: InstagramCardProps) {
  return (
    <div className="ig-card max-w-2xl mx-auto hover-lift hover-shine">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="ig-avatar-ring w-10 h-10 flex items-center justify-center">
          <div className="ig-avatar-inner w-full h-full">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-ig-pink to-ig-amber flex items-center justify-center">
              <span className="text-white text-xs font-bold">{username[0].toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-sans text-sm font-semibold">{username}</span>
            {verified && (
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          {sponsored && (
            <span className="text-gray-500 text-xs">Sponsored</span>
          )}
        </div>
      </div>

      {/* Content / embed */}
      <div className="w-full">{children}</div>

      {/* Action icons */}
      <div className="flex items-center gap-4 px-4 py-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
        <svg className="w-6 h-6 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
      </div>

      {/* Caption */}
      {caption && (
        <div className="px-4 pb-3">
          <p className="text-sm">
            <span className="font-semibold mr-1">{username}</span>
            {caption}
          </p>
        </div>
      )}

      {/* Analysis */}
      <AnalysisAccordion dimensions={dimensions} variant="ig" />
    </div>
  );
}
