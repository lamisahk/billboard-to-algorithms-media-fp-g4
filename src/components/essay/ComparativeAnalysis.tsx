import { useState } from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

/* ====== DATA ====== */

const whatChanged = [
  {
    title: "Visibility → Invisibility",
    era80: "Clear commercial intent, obvious ads",
    era20: "Native ads, influencer content, algorithm-driven",
    examples: [
      { sector: "Wellness", text: "Special K aired in clearly marked commercial breaks. Ozempic generated its most powerful effect through cultural conversation that advertising had seeded but that no longer looked like advertising." },
      { sector: "Business", text: "IBM's Little Tramp commercial aired during nationally broadcast television in clearly marked commercial slots. MasterClass trailers are formatted as cinematic documentaries, deliberately indistinguishable from editorial content." },
      { sector: "Financial", text: "E.F. Hutton's \"When E.F. Hutton Talks\" campaign ran in identifiable print advertisements in business publications. Coinbase's Super Bowl QR code contained almost no commercial information at all, and Robinhood's \"We Are All Investors\" spot was structured as a social manifesto rather than a product advertisement." },
      { sector: "Software", text: "Lotus 1-2-3 ran as an obvious technical spec sheet in business magazines. Notion's advertising is embedded within influencer tutorials indistinguishable from personal recommendations." },
      { sector: "Personal Tech", text: "The Casio calculator watch commercial featured Bert Parks speaking directly to camera in an unambiguous product demonstration. The Oura Ring's advertising is embedded within wellness influencer content and biohacking communities where it is experienced as a peer recommendation rather than a paid placement." }
    ],
    summary: "The structural shift from visible to invisible advertising is the defining transformation this project documents. In the 1980s, commercial intent was announced by the formats that carried it. In the 2020s, the formats that carry commercial content are specifically designed to be indistinguishable from non-commercial content."
  },
  {
    title: "Broadcast → Personalised",
    era80: "Mass audience targeting",
    era20: "Individual behavioral targeting",
    examples: [
      { sector: "Wellness", text: "Special K bought daytime TV slots to reach women broadly. Noom spent $21 million in a single month targeting individuals whose behavioral profiles indicated weight management interest." },
      { sector: "Business", text: "IBM bought Super Bowl slots and mainstream magazine pages to reach a general professional audience. Monday.com bought a Super Bowl slot for mass awareness then used LinkedIn and YouTube retargeting to follow specific individuals who engaged with the broadcast content across all subsequent digital activity." },
      { sector: "Financial", text: "Merrill Lynch bought prime-time television slots to reach investing-age adults as a demographic category. Robinhood built individual behavioral profiles from users' platform activity, search history, and social media engagement to serve personalized investment content to specific people at specific moments of financial curiosity or anxiety." },
      { sector: "Software", text: "Lotus 1-2-3 placed in business magazines read by managers generally. Notion's algorithm serves content to specific users based on documented productivity-related behavior." },
      { sector: "Personal Tech", text: "Sony Walkman ran television commercials during broadly scheduled programmes to reach young adults as a demographic. Apple Watch served algorithmically differentiated versions of the \"911\" campaign to distinct audience segments including elderly parents, athletes, and people with chronic conditions based on their documented behavioral profiles." }
    ],
    summary: "1980s advertising reached mass audiences through demographic inference. A time slot or a magazine implied a type of person. 2020s advertising reaches individuals through behavioral data that models their specific psychology."
  },
  {
    title: "Product → Identity",
    era80: "Selling features and benefits",
    era20: "Selling who you could become",
    examples: [
      { sector: "Wellness", text: "Dexatrim sold a pill. Noom sells a version of yourself that has a healthy relationship with food." },
      { sector: "Business", text: "IBM sold the PC as a tool that made work more efficient. MasterClass sells the identity of the ambitious, elite professional who invests in their own excellence." },
      { sector: "Financial", text: "E.F. Hutton sold credible financial advice from an established institution. Robinhood sells the identity of the empowered, democratically engaged individual investor who does not need institutional permission to participate in markets." },
      { sector: "Software", text: "Lotus 1-2-3 sold three integrated functions for $495. Notion sells the identity of the aesthetically organised, productive individual whose life runs on beautiful systems." },
      { sector: "Personal Tech", text: "The Sony Walkman sold portable music. The Oura Ring sells the identity of the self-aware, biometrically literate individual who understands their own body at a data level." }
    ],
    summary: "The shift from product to identity is what makes 2020s advertising structurally harder to resist. You can decide not to buy a product. It is much harder to decide not to become the person the advertising tells you that you should be."
  },
  {
    title: "Interruption → Infrastructure",
    era80: "Ads interrupted content",
    era20: "Ads became the content itself",
    examples: [
      { sector: "Wellness", text: "The commercial break was a pause in the programme. Hims & Hers advertising appears in podcast hosts' personal monologues, formatted as genuine health recommendations from a trusted voice." },
      { sector: "Business", text: "IBM's commercial interrupted the Super Bowl broadcast. LinkedIn's entire platform is simultaneously a professional tool and an advertising delivery system where the distinction between networking and commercial content is structurally invisible." },
      { sector: "Financial", text: "Merrill Lynch's television campaign ran between programmes. Robinhood's app itself is the advertising: every interface element, every push notification, every confetti animation is designed to drive continued trading activity." },
      { sector: "Software", text: "The Lotus magazine ad was a discrete object you could turn past. Notion's freemium model means using the product is the advertising: the more you invest in the platform, the more dependent you become, and the platform's growth is driven by users who evangelize it without being paid to do so." },
      { sector: "Personal Tech", text: "The Casio commercial ran in a commercial break. The Apple Watch and Oura Ring generate continuous advertising through their own interfaces: health notifications, achievement badges, and daily readiness scores are all commercial messaging experienced as personal health information." }
    ],
    summary: "When advertising becomes infrastructure, opting out of the advertising means opting out of the service. This is the most significant structural change in the history of commercial communication."
  }
];

const whatStayed = [
  "The gap-and-bridge structure: every ad across both eras identifies a deficiency in the consumer's current state and positions a purchase as the solution. The nature of the gap changed from physical inconvenience to existential inadequacy, but the architecture is identical.",
  "Identity as the real product: in every sector, in both eras, the purchase is presented as a statement about who the buyer is or wishes to become. The Walkman buyer was culturally autonomous. The Oura Ring buyer is biometrically self-aware. The product is always secondary to the identity it confers.",
  "The upgrade imperative: both eras created urgency around staying current. The 1980s positioned new products as the modern choice. The 2020s position continuous upgrades as a form of self-investment. In both cases, the message is the same: what you have now is no longer enough.",
  "Fear as a motivational substrate: Special K used body shame. Apple Watch uses survival anxiety. Robinhood uses the fear of financial exclusion. Noom uses the fear of remaining unable to control your own eating patterns. The emotional mechanism is consistent across forty years and five industries."
];

const researchQuestions = [
  {
    label: "RQ1",
    question: "How did advertising strategies in five industries evolve from the 1980s to the 2020s in terms of targeting methods, visibility of commercial intent, and psychological techniques?",
    answer: "Across all five sectors, the evolution follows a consistent three-part pattern. Targeting moved from demographic inference to individual behavioral profiling. Visibility of commercial intent declined from transparent to structurally concealed. Psychological techniques shifted from direct emotional appeals to embedded identity construction. The consistency of this pattern across healthcare, business, finance, software, and wearables suggests that the transformation is not industry-specific but structural: it reflects changes in media infrastructure, data availability, and the commercial logic of platform capitalism rather than changes in any single product category."
  },
  {
    label: "RQ2",
    question: "What ideological messages are embedded in advertisements from each era, and how do they shape consumer identity?",
    answer: "1980s advertisements encoded ideologies of aspiration, competence, and status within clearly commercial frameworks. The consumer could see the ad and evaluate its claims. 2020s advertisements encode ideologies of self-optimisation, personal responsibility, and identity construction within formats that do not announce themselves as commercial. The ideological messaging has not changed in kind: both eras tell the consumer who they should become and position the product as the means of becoming. What changed is the visibility of the framing. When the frame is invisible, the ideology is harder to identify and therefore harder to resist."
  },
  {
    label: "RQ3",
    question: "How effectively can audiences today identify and resist persuasive advertising compared to the 1980s?",
    answer: "The evidence from this analysis suggests that audience resistance has declined structurally rather than individually. Contemporary audiences are not less intelligent or less media-literate than 1980s audiences. The advertising they encounter is, however, specifically engineered to be unrecognisable as advertising. When a Noom ad appears as a therapist's Instagram story, when a Robinhood interface gamifies trading into a dopamine loop, when an Apple Watch documentary uses real emergency calls to sell a product, the audience's existing media literacy frameworks, which were developed for clearly marked commercial content, do not apply. The decline in resistance is not a failure of the audience. It is a success of the advertising."
  }
];

/* ====== COMPONENT ====== */

export default function ComparativeAnalysis() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [expandedRQ, setExpandedRQ] = useState<number | null>(null);

  const headerRef = useScrollReveal<HTMLDivElement>(0.2);
  const changedRef = useStaggerReveal<HTMLDivElement>();
  const stayedRef = useStaggerReveal<HTMLDivElement>();
  const rqRef = useStaggerReveal<HTMLDivElement>();

  return (
    <div id="comparative">
      {/* ===== COMPARATIVE ANALYSIS (Mode 3) ===== */}
      <section className="relative py-20 px-4" style={{ background: 'hsl(40, 30%, 96%)' }}>
        {/* Rainbow top border */}
        <div className="absolute top-0 left-0 right-0 h-[5px]" style={{
          background: 'linear-gradient(90deg, hsl(330, 80%, 55%), hsl(20, 70%, 50%), hsl(38, 95%, 55%), hsl(145, 80%, 50%))'
        }} />

        <div ref={headerRef} className="reveal max-w-4xl mx-auto text-center mb-16">
          <p className="font-mono text-xs tracking-[0.3em] mb-4" style={{ color: 'hsl(220, 10%, 50%)' }}>
            CROSS-SECTOR ANALYSIS
          </p>
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6" style={{ color: 'hsl(220, 20%, 15%)' }}>
            Universal Patterns
          </h2>
          <p className="font-sans text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'hsl(220, 10%, 35%)' }}>
            Five industries, forty years, one pattern. The methods evolved. The mission did not.
          </p>
        </div>

        {/* What Changed */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="font-serif text-3xl md:text-4xl font-bold mb-10 text-center" style={{ color: 'hsl(220, 20%, 15%)' }}>
            What Changed Across All Sectors
          </h3>

          <div ref={changedRef} className="reveal-stagger grid md:grid-cols-2 gap-6">
            {whatChanged.map((item, i) => (
              <div
                key={i}
                className="rounded-lg p-6 cursor-pointer transition-all duration-300"
                style={{
                  background: 'white',
                  border: expandedCard === i ? '2px solid hsl(330, 80%, 55%)' : '1px solid hsl(0, 0%, 88%)',
                  boxShadow: expandedCard === i ? '0 8px 30px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)'
                }}
                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-xl font-bold" style={{ color: 'hsl(220, 20%, 15%)' }}>
                    {item.title}
                  </h4>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${expandedCard === i ? 'rotate-180' : ''}`}
                    style={{ color: 'hsl(220, 10%, 50%)' }}
                  />
                </div>
                <div className="flex gap-4 mb-3">
                  <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: 'hsl(210, 50%, 92%)', color: 'hsl(215, 70%, 35%)' }}>
                    1980s: {item.era80}
                  </span>
                  <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: 'hsl(270, 40%, 92%)', color: 'hsl(270, 50%, 35%)' }}>
                    2020s: {item.era20}
                  </span>
                </div>

                {expandedCard === i && (
                  <div className="mt-4 space-y-3 border-t pt-4" style={{ borderColor: 'hsl(0, 0%, 90%)' }}>
                    {item.examples.map((ex, j) => (
                      <div key={j}>
                        <span className="font-mono text-[10px] tracking-wider font-bold" style={{ color: 'hsl(330, 80%, 55%)' }}>
                          {ex.sector.toUpperCase()}
                        </span>
                        <p className="font-sans text-sm leading-relaxed mt-1" style={{ color: 'hsl(220, 10%, 35%)' }}>
                          {ex.text}
                        </p>
                      </div>
                    ))}
                    <div className="mt-4 p-4 rounded" style={{ background: 'hsl(40, 30%, 94%)', borderLeft: '3px solid hsl(330, 80%, 55%)' }}>
                      <p className="font-serif text-sm italic leading-relaxed" style={{ color: 'hsl(220, 20%, 20%)' }}>
                        {item.summary}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What Stayed the Same */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="font-serif text-3xl md:text-4xl font-bold mb-10 text-center" style={{ color: 'hsl(220, 20%, 15%)' }}>
            What Stayed the Same
          </h3>

          <div ref={stayedRef} className="reveal-stagger space-y-6">
            {whatStayed.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm" style={{
                  background: 'hsl(38, 95%, 55%)',
                  color: 'white'
                }}>
                  {i + 1}
                </div>
                <p className="font-sans text-base leading-relaxed pt-1" style={{ color: 'hsl(220, 10%, 30%)' }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div className="mt-12 py-8 px-8" style={{ borderLeft: '4px solid hsl(330, 80%, 55%)' }}>
            <p className="font-serif text-2xl md:text-3xl italic leading-snug" style={{ color: 'hsl(220, 20%, 15%)' }}>
              "The product changes. The identity purchase does not."
            </p>
          </div>
        </div>

        {/* Research Questions */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-3xl md:text-4xl font-bold mb-10 text-center" style={{ color: 'hsl(220, 20%, 15%)' }}>
            Research Questions Answered
          </h3>

          <div ref={rqRef} className="reveal-stagger space-y-4">
            {researchQuestions.map((rq, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  background: 'white',
                  border: '1px solid hsl(0, 0%, 88%)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <button
                  onClick={() => setExpandedRQ(expandedRQ === i ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded flex-shrink-0" style={{
                    background: 'hsl(330, 80%, 55%)',
                    color: 'white'
                  }}>
                    {rq.label}
                  </span>
                  <span className="font-serif text-base font-semibold flex-1" style={{ color: 'hsl(220, 20%, 15%)' }}>
                    {rq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${expandedRQ === i ? 'rotate-180' : ''}`}
                    style={{ color: 'hsl(220, 10%, 50%)' }}
                  />
                </button>
                {expandedRQ === i && (
                  <div className="px-6 pb-6">
                    <p className="font-sans text-sm leading-relaxed" style={{ color: 'hsl(220, 10%, 30%)' }}>
                      {rq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY IT MATTERS (Mode 3 dark variant) ===== */}
      <section className="py-20 px-4" style={{ background: 'hsl(220, 20%, 10%)' }}>
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-4xl md:text-5xl font-bold mb-10 text-center" style={{ color: 'white' }}>
            Why It Matters
          </h3>

          <div className="space-y-6 font-sans text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
            <p>
              The transformation documented across these five sectors is not primarily a story about technology. It is a story about the disappearance of a boundary that once protected the space between who you are and who commerce wants you to become. In the 1980s, advertising announced itself. You could evaluate it, resist it, or simply look away. The commercial break was a structural pause in which the audience understood that what followed was an attempt to sell them something. That understanding, however imperfect, was itself a form of defense.
            </p>
            <p>
              That defense has been structurally dismantled. The twenty advertisements analysed in this project demonstrate that advertising in the 2020s is no longer a discrete category of content. It is the content. It is the platform. It is the recommendation from a trusted voice. It is the health notification on your wrist. It is the interface you use to manage your money, your productivity, your sleep, and your sense of professional worth. The distinction between advertising and life has become, in many cases, genuinely impossible to locate.
            </p>
          </div>

          {/* "They Live" dark quote block */}
          <div className="my-12 p-8 rounded-lg" style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderLeft: '4px solid hsl(145, 80%, 50%)'
          }}>
            <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-4" style={{ color: 'hsl(145, 80%, 70%)' }}>
              "They Live" showed a world where special glasses revealed hidden messages in advertising: OBEY, CONSUME, CONFORM.
            </p>
            <p className="font-sans text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              The premise was that advertising contained concealed ideological commands that only became visible through a special lens. What this project documents is something the film did not anticipate: a world in which the glasses would not help, because the advertising is no longer hidden within content. It has become the content. There is nothing beneath the surface to reveal because the surface is all there is.
            </p>
          </div>

          <p className="font-sans text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
            This matters because the skills that media literacy education currently teaches, identifying sponsors, recognising paid placements, distinguishing editorial from advertorial, were designed for a media landscape that no longer exists. The 2020s require a new literacy: one that can identify commercial intent when it is structurally invisible, evaluate identity claims when they are embedded in the infrastructure of daily tools, and maintain critical distance from systems designed to eliminate the possibility of critical distance. That literacy does not yet exist at scale. Building it is the most important media education challenge of the next decade.
          </p>
        </div>
      </section>

      {/* ===== CONCLUSION (Mode 3) ===== */}
      <section id="conclusion" className="relative py-20 px-4" style={{ background: 'hsl(40, 30%, 96%)' }}>
        {/* Rainbow top border */}
        <div className="absolute top-0 left-0 right-0 h-[5px]" style={{
          background: 'linear-gradient(90deg, hsl(330, 80%, 55%), hsl(20, 70%, 50%), hsl(38, 95%, 55%), hsl(145, 80%, 50%))'
        }} />

        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-5xl md:text-7xl font-bold mb-10 text-center" style={{ color: 'hsl(220, 20%, 15%)' }}>
            Forty Years.<br />One Pattern.
          </h3>

          <div className="space-y-6 font-sans text-base leading-relaxed" style={{ color: 'hsl(220, 10%, 30%)' }}>
            <p>
              Between the 1980s and the 2020s, advertising did not simply change its tools. It changed its relationship to the audience. It moved from interrupting your attention to inhabiting your attention. It moved from selling you a product to selling you an identity. It moved from operating within clearly marked commercial spaces to dissolving those spaces entirely. Across five industries, the pattern is identical: what was once visible became invisible, what was once broadcast became personal, and what was once a transaction became a dependency.
            </p>
            <p>
              The twenty advertisements analysed in this project, from Special K to Noom, from IBM to Notion, from E.F. Hutton to Robinhood, from the Sony Walkman to the Oura Ring, tell a single story from five different angles. The story is not about the products. It is about the progressive disappearance of the boundary between the commercial and the personal, until the two became, for many people, genuinely indistinguishable.
            </p>
          </div>

          {/* Pull quote */}
          <div className="my-12 py-8 px-8" style={{ borderLeft: '4px solid hsl(330, 80%, 55%)' }}>
            <p className="font-serif text-2xl md:text-3xl italic leading-snug" style={{ color: 'hsl(220, 20%, 15%)' }}>
              "The methods evolved. The mission did not. The mission was always the same: to identify a gap between who you are and who you should be, and to sell you something to fill it."
            </p>
          </div>

          {/* Final italic block */}
          <div className="text-center mt-12 mb-8">
            <p className="font-serif text-lg italic leading-relaxed" style={{ color: 'hsl(220, 10%, 40%)' }}>
              We are not arguing that advertising is inherently harmful. We are documenting a structural transformation in which the possibility of recognising advertising as advertising has been systematically reduced. The first step in rebuilding that recognition is understanding how it was dismantled. That is what this project has attempted to do.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REFERENCES (Mode 1) ===== */}
      <section className="mac-desktop py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mac-window rounded-sm">
            <div className="mac-titlebar">
              <div className="mac-titlebar-buttons">
                <div className="mac-titlebar-btn" />
                <div className="mac-titlebar-btn" />
              </div>
              <span className="mac-titlebar-label">References.bib</span>
            </div>
            <div className="mac-body text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <div className="space-y-4" style={{ paddingLeft: '2em', textIndent: '-2em' }}>
                <p>Baudrillard, J. (1998). <em>The consumer society: Myths and structures</em>. SAGE Publications.</p>
                <p>De Keyzer, F., Van Noort, G., &amp; Kruikemeier, S. (2024). Going too far? How consumers respond to personalized advertising from different sources. <em>Journal of Electronic Commerce Research</em>, 25(1), 33-52.</p>
                <p>Hall, S. (1980). Encoding/decoding. In S. Hall, D. Hobson, A. Lowe, &amp; P. Willis (Eds.), <em>Culture, media, language</em> (pp. 128-138). Hutchinson.</p>
                <p>Packard, V. (1957). <em>The hidden persuaders</em>. David McKay Company.</p>
                <p>Turow, J. (2011). <em>The daily you: How the new advertising industry is defining your identity and your worth</em>. Yale University Press.</p>
                <p>Van Reijmersdal, E. A., Rozendaal, E., Hudders, L., Vanwesenbeeck, I., Cauberghe, V., &amp; van Berlo, Z. M. C. (2023). Effects of disclosing influencer marketing in videos: An eye-tracking study among children in early adolescence. <em>Journal of Interactive Marketing</em>, 55(1), 1-19.</p>
                <p>Zuboff, S. (2019). <em>The age of surveillance capitalism: The fight for a human future at the new frontier of power</em>. PublicAffairs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section className="py-12 px-4 text-center" style={{ background: '#000' }}>
        <p className="font-pixel text-[9px] tracking-[0.3em] mb-2" style={{ color: 'hsl(330, 90%, 65%)' }}>
          MCOM 103 · GROUP 4 (L51)
        </p>
        <p className="font-pixel text-[8px] tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
          FROM BILLBOARDS TO ALGORITHMS · MARCH 2026
        </p>
        <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Lamisah · Hiba · Almaha · Lamis · Alreem
        </p>
      </section>
    </div>
  );
}
