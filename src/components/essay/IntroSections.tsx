import { useState } from "react";
import MacWindow from "./MacWindow";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { ChevronDown, FileText } from "lucide-react";

/* ====== ACADEMIC SOURCES ====== */

const academicSources = [
  {
    id: "packard",
    label: "Packard 1957",
    title: "The Hidden Persuaders",
    author: "Vance Packard",
    summary:
      "Advertisers have long used depth psychology and motivational research to influence consumer decisions below the level of conscious awareness, meaning advertising manufactures want rather than responding to them.",
  },
  {
    id: "hall",
    label: "Hall 1980",
    title: "Encoding/Decoding",
    author: "Stuart Hall",
    summary:
      "Media texts are encoded with dominant ideological meanings by producers, but audiences can accept, negotiate, or resist those meanings. Recognition of persuasive intent is the first condition of resistance.",
  },
  {
    id: "baudrillard",
    label: "Baudrillard 1998",
    title: "The Consumer Society: Myths and Structures",
    author: "Jean Baudrillard",
    summary:
      "Consumption in late capitalism is fundamentally about purchasing signs and identities rather than satisfying material needs. Advertising sells who you should become, not what you should own.",
  },
  {
    id: "turow",
    label: "Turow 2011",
    title: "The Daily You",
    author: "Joseph Turow",
    summary:
      "Digital advertising infrastructure sorts individuals into algorithmically constructed audience segments, creating fragmented commercial realities where different people receive entirely different information, prices, and opportunities based on their data profiles.",
  },
  {
    id: "zuboff",
    label: "Zuboff 2019",
    title: "The Age of Surveillance Capitalism",
    author: "Shoshana Zuboff",
    summary:
      "Behavioral data harvested through digital platforms is not simply used to target ads more accurately but to predict and modify future behavior before decisions are consciously made, shifting advertising from persuasion into behavioral engineering.",
  },
  {
    id: "vanreijmersdal",
    label: "Van Reijmersdal et al. 2023",
    title: "Disclosure-Driven Recognition of Native Advertising",
    author: "Van Reijmersdal, Brussee, Evans, and Wojdynski",
    summary:
      "Even when legal disclosure labels were present, the structural embedding of sponsored content within editorial formats consistently prevented consumers from recognizing commercial intent, and when recognition did occur, it produced skepticism toward publishers rather than rejection of the ad.",
  },
  {
    id: "dekeyzer",
    label: "De Keyzer et al. 2024",
    title: "The Role of Well-Being in Consumers' Responses to Personalized Advertising",
    author: "De Keyzer, Dens, De Pelsmacker, and van Noort",
    summary:
      "Highly personalized social media advertising produced not only higher brand engagement but measurable effects on consumers' self-perception and sense of identity, confirming that algorithmic advertising actively participates in constructing who consumers understand themselves to be.",
  },
];

/* ====== FRAMEWORK DIMENSIONS ====== */

const frameworkDimensions = [
  {
    label: "Targeting methods",
    content:
      "Who is the intended audience, and how does the ad reach them? This includes demographic targeting through media placement in the 1980s and behavioral, algorithmic targeting in the 2020s.",
  },
  {
    label: "Visibility of commercial intent",
    content:
      "How obvious is it that this is an advertisement? Does it announce itself clearly, or is the commercial intent obscured by format, platform, or delivery?",
  },
  {
    label: "Psychological techniques",
    content:
      "What specific mechanisms does the ad use to influence the audience? This includes fear, aspiration, social proof, manufactured scarcity, parasocial trust, and identity-based appeals.",
  },
  {
    label: "Ideological messaging",
    content:
      "What values, identities, or worldviews does the ad embed? What vision of the good life, the successful person, or the healthy body does it sell alongside the product?",
  },
  {
    label: "Audience resistance",
    content:
      "How easy is it for the audience to recognize the persuasion and choose not to be influenced by it? This is shaped by the visibility of commercial intent, the emotional register of the ad, and the structural context in which it is encountered.",
  },
];

/* ====== SOURCE POPUP ====== */

function SourcePopup({
  source,
  onClose,
}: {
  source: (typeof academicSources)[0];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="mac-window max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <div className="mac-titlebar">
          <div className="mac-titlebar-buttons">
            <button className="mac-titlebar-btn" onClick={onClose} />
            <div className="mac-titlebar-btn" />
          </div>
          <span className="mac-titlebar-label">{source.label}</span>
        </div>
        <div className="mac-body">
          <h4 className="font-display text-lg font-bold mb-1" style={{ color: "#1a1a1a" }}>
            {source.title}
          </h4>
          <p className="font-mono text-xs mb-4" style={{ color: "#888" }}>
            {source.author}
          </p>
          <p className="font-mono text-sm leading-relaxed" style={{ color: "#333" }}>
            {source.summary}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ====== MAIN COMPONENT ====== */

export default function IntroSections() {
  const [selectedSource, setSelectedSource] = useState<(typeof academicSources)[0] | null>(null);
  const [openDimension, setOpenDimension] = useState<number | null>(null);

  const introRef = useScrollReveal<HTMLDivElement>();
  const litSourcesRef = useScrollReveal<HTMLDivElement>();
  const litFrameworkRef = useScrollReveal<HTMLDivElement>();
  const analysisRef = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      {/* ===== INTRODUCTION (Mode 1) ===== */}
      <section className="mac-desktop py-20 px-4">
        <div ref={introRef} className="reveal">
          <MacWindow title="Introduction.txt">
            <p className="mb-4">
              Every year, the average person encounters thousands of advertisements. In the 1980s, you could see them coming: a commercial break, a magazine spread, a billboard on the highway etc. You knew it was an ad. You could look away.
            </p>

            <div
              className="my-6 py-4 px-6 text-center rounded"
              style={{
                background: "hsl(210, 50%, 88%)",
                border: "2px solid hsl(210, 50%, 78%)",
              }}
            >
              <p className="font-display text-2xl md:text-3xl font-bold" style={{ color: "hsl(215, 70%, 30%)" }}>
                Today you cannot.
              </p>
            </div>

            <p className="mb-4">
              The ad arrives as a friend's recommendation, a podcast host's morning routine, a documentary on a streaming platform. It knows what you searched three days ago and what you're likely to want before you've consciously decided you want it. Advertising didn't just change its format. It dissolved into the infrastructure of daily life, and somewhere in that process, it stopped looking like advertising at all.
            </p>
            <p className="mb-4">
              This transformation is what this project is about. Between the 1980s and the 2020s, the way commercial messages reach people changed beyond recognition. Broadcast gave way to algorithms. Mass audiences are fragmented into individual behavioral profiles. The commercial break became the content itself. And yet, for all that changed, something held constant: the fundamental project of advertising has always been to identify a gap between who you are and who you should be, and to sell you something to fill it. The methods evolved. The mission didn't.
            </p>
            <p>
              We examine that tension across five industries: Healthcare/Wellness, Business/Professional Identity, Investment/Wealth-Building, Software/Digital Platforms, and Wearables/Personal Tech. Each sector tells a version of the same story from a different angle, and together they reveal a pattern that no single industry analysis could. What this website documents is not just the history of advertising. It's the history of how we've been told who to become, and how that telling became so fluent we stopped noticing it.
            </p>
          </MacWindow>
        </div>
      </section>

      {/* ===== LITERATURE REVIEW (Mode 1) ===== */}
      <section className="mac-desktop py-16 px-4">
        <div className="max-w-4xl mx-auto mb-6">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-3" style={{ color: "white", textShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}>
            Literature Review
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] text-center mb-8" style={{ color: "hsl(180, 100%, 80%)" }}>
            THEORETICAL FOUNDATIONS
          </p>
        </div>

        {/* Window 1: Source icons */}
        <div ref={litSourcesRef} className="reveal-left mb-10">
          <MacWindow title="sources/">
            <p className="font-mono text-xs mb-4" style={{ color: "#888" }}>
              7 items — click to open
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {academicSources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => setSelectedSource(source)}
                  className="flex flex-col items-center gap-2 p-3 rounded hover:bg-gray-100 transition-colors group"
                >
                  <FileText className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="font-pixel text-[8px] text-center leading-tight" style={{ color: "#555" }}>
                    {source.label}
                  </span>
                </button>
              ))}
            </div>
          </MacWindow>
        </div>

        {/* Window 2: Theoretical framework narrative */}
        <div ref={litFrameworkRef} className="reveal-right">
          <MacWindow title="theoretical_framework.txt">
            <p className="mb-4">
              The claim that advertising operates as social engineering rather than product information has a long academic history, but it has rarely felt more urgent than now. Vance Packard's The Hidden Persuaders (1957) remains the foundational text: drawing on industry research from the 1950s, Packard documented how advertisers employed depth psychology and motivational research to shape consumer behavior below the level of conscious awareness. His central argument was not that advertising was persuasive but that it was specifically designed to bypass rational evaluation. That argument is the premise this project tests across forty years and five industries.
            </p>
            <p className="mb-4">
              Stuart Hall's encoding/decoding model (1980) provides our primary analytical tool. Hall proposed that media producers encode texts with dominant ideological meanings, and that audiences decode those meanings in one of three positions: dominant, negotiated, or oppositional. Applied to advertising, the framework allows us to ask not only what values an ad embeds but how transparent that embedding is. Visibility matters because recognition is the first condition of resistance. An audience that knows it is being persuaded can push back. An audience that does not recognize persuasion at all cannot. This question of visibility is central to our historical comparison.
            </p>
            <p className="mb-4">
              Jean Baudrillard's The Consumer Society (1998) extends the analysis into the ideological function of consumption itself. Baudrillard argued that what people purchase in late capitalist societies is not primarily utility but signs: identities, social positions, and aspirational selves that products have come to represent. This explains a pattern that holds across every sector we examine. In the 1980s and the 2020s alike, advertising does not fundamentally sell products. It sells versions of who the consumer should become.
            </p>
            <p className="mb-4">
              Shoshana Zuboff's The Age of Surveillance Capitalism (2019) provides the structural account of why this dynamic became qualitatively more powerful in the digital era. Zuboff's argument is that behavioral data harvested through digital platforms is not simply used to target advertising more accurately. It is used to build predictive models of individual psychology and to modify future behavior before decisions are consciously made. This moves advertising from the realm of persuasion, which operates on a subject capable of resistance, into the realm of behavioral engineering, which shapes the conditions in which decisions occur. Zuboff's framework is essential for understanding why 2020s advertising is not just technologically updated but categorically different in its social power.
            </p>
            <p className="mb-4">
              Joseph Turow's The Daily You (2011) documents the consumer experience of this shift. Turow shows how digital advertising infrastructure sorts individuals into algorithmically constructed segments, determining not just what ads they see but what prices, opportunities, and information they can access. The result is a fragmented media environment in which different people inhabit fundamentally different commercial realities, each one calibrated to their data profile. The shared public addressed by 1980s broadcast advertising no longer exists as a coherent entity.
            </p>
            <p className="mb-4">
              Two recent empirical studies ground these theoretical frameworks in contemporary evidence. Van Reijmersdal, Brussee, Evans, and Wojdynski (2023), in a study published in the Journal of Interactive Advertising, examined how disclosure design affects native advertising recognition. Their experiment found that even when consumers encountered legal disclosure labels, the structural embedding of sponsored content within editorial formats consistently undermined recognition of commercial intent. Disclosures that did produce recognition tended to generate skepticism toward the publisher rather than rejection of the ad itself, a finding that complicates straightforward arguments for transparency as a solution to covert advertising. This study directly supports our argument that the shift toward invisible advertising has structural consequences that legal remedies alone cannot address.
            </p>
            <p className="mb-4">
              De Keyzer et al. (2024), publishing in Psychology and Marketing, examined how perceived personalization in social media advertising affects consumer wellbeing, brand engagement, and ad avoidance across two cross-sectional studies. Their findings showed that highly personalized advertising produces not only higher engagement but measurable effects on self-perception, with consumers' sense of relevance and self-realization shaped by algorithmically curated commercial content. This confirms what our theoretical framework predicts: modern advertising does not merely influence purchase decisions but actively participates in the construction of consumer identity.
            </p>
            <p>
              Taken together, these sources establish both the historical continuity and the structural transformation that this project documents. Most existing scholarship examines advertising in a single industry or a single period. Our contribution is comparative. By tracing the same advertising logic across five sectors and two distinct technological eras, we surface the universal patterns that narrower analysis tends to miss. The evolution we document is not one of mission but of method, and the methodological shift toward invisibility is, we argue, the most consequential development in advertising's history. Whether that shift represents a change in kind or merely a change in degree is a question this project takes seriously. The answer, as the evidence across five industries will show, is both.
            </p>
          </MacWindow>
        </div>
      </section>

      {/* ===== ANALYSIS FRAMEWORK (Mode 1) ===== */}
      <section className="mac-desktop py-16 px-4">
        <div className="max-w-4xl mx-auto mb-6">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-3" style={{ color: "white", textShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}>
            Analysis Framework
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] text-center mb-8" style={{ color: "hsl(180, 100%, 80%)" }}>
            FIVE DIMENSIONS
          </p>
        </div>

        <div ref={analysisRef} className="reveal-scale">
          <MacWindow title="analysis_framework.txt">
            <p className="mb-4">
              Every advertisement analyzed in this project is examined through the same five-part framework, applied consistently across all sectors and both time periods.
            </p>

            {/* 5-item accordion */}
            <div className="mt-2 border-t border-gray-200">
              {frameworkDimensions.map((dim, i) => (
                <div key={i} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => setOpenDimension(openDimension === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-mono text-sm font-semibold" style={{ color: "#333" }}>
                      <span
                        className="inline-block w-6 h-6 rounded text-center text-xs leading-6 mr-3 font-bold"
                        style={{ background: "hsl(210, 50%, 88%)", color: "hsl(215, 70%, 30%)" }}
                      >
                        {i + 1}
                      </span>
                      {dim.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform text-gray-400 ${openDimension === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDimension === i && (
                    <div className="px-4 pb-4 pl-14">
                      <p className="font-mono text-sm leading-relaxed" style={{ color: "#444" }}>
                        {dim.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-4 font-mono text-sm leading-relaxed" style={{ color: "#555" }}>
              Applying this framework consistently across sectors and eras allows us to identify what changed between the 1980s and 2020s and what stayed the same, at the level of specific technique rather than general impression.
            </p>
          </MacWindow>
        </div>
      </section>

      {/* Source popup */}
      {selectedSource && (
        <SourcePopup source={selectedSource} onClose={() => setSelectedSource(null)} />
      )}
    </div>
  );
}
