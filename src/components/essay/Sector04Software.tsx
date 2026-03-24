import MacWindow from "./MacWindow";
import AnalysisAccordion from "./AnalysisAccordion";
import InstagramCard from "./InstagramCard";
import { useState } from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import lotusAd from "@/assets/lotus_123_ad.png";
import notionCampaign1 from "@/assets/notion_campaign_1.png";
import notionCampaign2 from "@/assets/notion_campaign_2.png";

/* ====== AD DATA ====== */

const appleDimensions = [
{
  label: "Targeting methods",
  content: "Apple targeted a mass-market audience, and individuals who felt intimidated by the reputation of computing. The Super Bowl placement ensured the widest possible broadcast reach, positioning the ad as a cultural event rather than a conventional product announcement."
},
{
  label: "Visibility of commercial intent",
  content: "High. While the ad was cinematic and lacked traditional product shots, it was a high-budget promotional film aired during the Super Bowl. It felt more like a short film than a standard advertisement of that time, but the Apple branding and product announcement at the close left no ambiguity about its commercial purpose."
},
{
  label: "Psychological techniques",
  content: "The ad utilizes fear. It positions the act of buying a computer as a radical act of self-expression. It invites the consumer to see themselves as a 'hero' or 'rebel' for choosing Apple. The dystopian imagery creates a binary: you are either part of the mindless crowd or the individual who shatters conformity. Buying a Macintosh becomes an act of liberation."
},
{
  label: "Ideological messaging",
  content: "The idea being sold is an empowered individual. The ideology suggests that technology in the right hands is a tool for freedom and creativity rather than control. It rebranded the computer from a 'math machine' into a 'creative partner'. IBM, unnamed but unmistakable, represents corporate tyranny. Apple represents personal liberation through technology."
},
{
  label: "Audience resistance",
  content: "Compared to modern advertising, this was easier to recognize as a commercial effort. However, it is difficult to resist because it bypasses the logical brain and targets the emotional brain, perhaps making the consumer feel that rejecting the product is equivalent to accepting a boring, conformist life."
}];


const lotusDimensions = [
{
  label: "Targeting methods",
  content: "Business managers and accountants, reached through print placements in business computing magazines like Personal Computing. The text-heavy, specification-driven format assumed a reader who was already considering software purchases and needed technical justification for a buying decision."
},
{
  label: "Visibility of commercial intent",
  content: "Obvious. It looks like a technical spec sheet. The full-page format, product name in bold, price disclosure, and dealer contact information make this unmistakably an advertisement. There is no attempt to disguise the commercial intent."
},
{
  label: "Psychological techniques",
  content: "Appeals to order and control. It promises to eliminate the 'chaos' of manual ledger sheets. The headline 'Introducing 1-2-3. It'll have your IBM/PC jumping through hoops' uses playful language to make a dense, technical product feel exciting rather than intimidating. The three-in-one value proposition appeals to rational cost-benefit analysis."
},
{
  label: "Ideological messaging",
  content: "Efficiency is the highest corporate virtue. The ad sells the identity of the 'modern, professional executive' who embraces technological tools to outperform competitors still relying on manual methods. Software mastery is framed as professional competence."
},
{
  label: "Audience resistance",
  content: "High. It is clearly an ad trying to sell a $495 box. Many readers might simply turn the page. The format makes no attempt to disguise what it is, and the density of technical information means only genuinely interested readers would engage with it."
}];


const notionDimensions = [
{
  label: "Targeting methods",
  content: "Knowledge workers, students, and 'creatives' (Gen Z/Millennials). Notion reached this audience through a multi-platform strategy combining outdoor billboards and bus stops with algorithmic targeting on Instagram, TikTok, YouTube, and digital display networks. The outdoor campaign is an interesting reversal: a brand that built itself through invisible digital advertising chose at a certain scale to make itself visible in physical public space, which is itself evidence of how normalised its presence had become."
},
{
  label: "Visibility of commercial intent",
  content: "Low to medium. The advertising is 'hidden' within content that looks like a personal recommendation or tutorial. The outdoor campaign is an interesting reversal: a brand that built itself through invisible digital advertising chose at a certain scale to make itself visible in physical public space. The hand-drawn illustrations and clean interface screenshots make the ads feel like design inspiration rather than product promotion."
},
{
  label: "Psychological techniques",
  content: "It utilizes the 'Aesthetic of Order'. By showing a clean, emoji-filled dashboard, it promises mental clarity and control over one's chaotic schedule. The illustrated characters create warmth and approachability, positioning the software not as a corporate tool but as a personal companion for organising your life."
},
{
  label: "Ideological messaging",
  content: "The message is that a lack of success is simply a 'system failure' that can be fixed with the right software. It frames productivity as a form of 'self care', suggesting that being busy is fine as long as it is organized. 'Peace of mind across work and life' collapses the boundary between professional output and personal wellbeing, making both dependent on a single platform."
},
{
  label: "Audience resistance",
  content: "Difficult. Because Notion uses a 'Freemium' model, the barrier to entry is non-existent. Users can start using the full app for free. Resistance is low as the 'ad' itself is a useful template. Once a user invests dozens of hours building in Notion, the switching costs become so high that they are almost locked into the ecosystem for years."
}];


const chatgptDimensions = [
{
  label: "Targeting methods",
  content: "Mass markets. They reach users as the tool itself is so 'magical' that users share it for free, acting as unpaid advertisers. The demonstration format ensures organic distribution through tech media, social media shares, and word-of-mouth, creating a viral loop that requires no paid advertising placement."
},
{
  label: "Visibility of commercial intent",
  content: "Very Low. These are presented as 'Demos' rather than ads. They don't ask you to buy; they invite you to try. The format mimics a technology showcase or educational content rather than a promotional campaign, making the commercial intent nearly invisible."
},
{
  label: "Psychological techniques",
  content: "It promises to remove the effort of thinking, writing, or coding. It appeals to the human desire for an easy path. The real-time demonstration creates a sense of wonder that bypasses critical evaluation. The conversational interface makes the AI feel like a companion rather than a product, establishing a parasocial relationship with software."
},
{
  label: "Ideological messaging",
  content: "The messaging suggests that human intelligence is limited and that to remain competitive, one must 'augment' themselves with AI. This positions cognitive outsourcing as progress rather than dependency, and frames resistance to AI adoption as professional self-sabotage."
},
{
  label: "Audience resistance",
  content: "Extremely Hard. As AI becomes integrated into search engines and word processors, 'resisting' the ad becomes equivalent to resisting the internet itself. The tool's genuine utility makes the distinction between product and infrastructure collapse entirely."
}];


/* ====== COMPONENT ====== */

export default function Sector04Software() {
  const [dialogDismissed, setDialogDismissed] = useState(false);

  const headerRef = useScrollReveal<HTMLDivElement>(0.2);
  const introRef = useScrollReveal<HTMLDivElement>();
  const ad1Ref = useScrollReveal<HTMLDivElement>();
  const ad2Ref = useScrollReveal<HTMLDivElement>();
  const transitionRef = useStaggerReveal<HTMLDivElement>();
  const ad3Ref = useScrollReveal<HTMLDivElement>();
  const ad4Ref = useScrollReveal<HTMLDivElement>();
  const summaryRef = useStaggerReveal<HTMLDivElement>();
  const perspectiveRef = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      {/* ===== SECTOR HEADER (Mode 1) ===== */}
      <section className="mac-desktop py-24 px-4">
        <div ref={headerRef} className="reveal-blur max-w-4xl mx-auto text-center">
          <p className="font-pixel tracking-[0.3em] mb-4 text-sm text-white" style={{ color: 'hsl(180, 100%, 80%)' }}>
            SECTOR
          </p>
          <h2 className="font-display text-7xl md:text-9xl font-extrabold mb-4" style={{ color: 'white', textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
            04
          </h2>
          <h3 className="font-display text-2xl md:text-4xl font-bold tracking-wide mb-6" style={{ color: 'white' }}>
            SOFTWARE &amp; DIGITAL PLATFORMS
          </h3>
          <div className="inline-block px-4 py-2 rounded" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <p className="font-pixel text-[9px] tracking-wider" style={{ color: 'hsl(180, 100%, 85%)' }}>
              LAMIS · INFORMATION TECHNOLOGY
            </p>
          </div>
        </div>
      </section>

      {/* ===== INTRO WINDOW (Mode 1) ===== */}
      <section className="mac-desktop py-16 px-4">
        <div ref={introRef} className="reveal">
          <MacWindow title="sector_04_intro.txt">
            <p className="mb-4">
              Software advertising refers to the promotion of digital infrastructures that range from specialized utility tools such as spreadsheets to comprehensive cloud ecosystems. These platforms act as intermediaries that structure how individuals work, communicate, and organize daily life.
            </p>
            <p className="mb-4">
              Digital platforms have moved from being external 'tools' used for specific tasks to becoming the primary environment for human activity. We now live in a state of 'algorithmic life' where our productivity, social standing, and even our sense of time are managed by software. Advertising in this sector no longer focuses on selling a product; it focuses on establishing a technological dependency.
            </p>
            <p className="mb-4">
              The evolution followed a clear trajectory. In the 1980s, software was a physical product sold via feature lists in magazines. By the 2010s, the move to SaaS (Software as a Service) and the Cloud transformed distribution. By the 2020s, AI-integrated, platform-based ecosystems sell 'flow' and 'lifestyle optimization' rather than discrete features.
            </p>
            <p>
              This sector matters because software advertising does not just sell tools. It sells a way of being in the world, one in which constant digital mediation is presented as the only path to professional relevance and personal fulfilment.
            </p>
          </MacWindow>
        </div>
      </section>

      {/* ===== 1980s ADS (Mode 1) ===== */}
      <section className="mac-desktop py-16 px-4">
        <div className="max-w-4xl mx-auto mb-6">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-3" style={{ color: 'white', textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}>
            1980s Advertisements
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] text-center mb-8" style={{ color: 'hsl(180, 100%, 80%)' }}>
            BOXED SOFTWARE ERA
          </p>
        </div>

        {/* Ad #1: Apple Macintosh 1984 */}
        <div ref={ad1Ref} className="reveal-left max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_01_Apple1984.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #1
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                Apple Macintosh "1984" Super Bowl Commercial
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Television Commercial · 1984 · Super Bowl XVIII, National Broadcast
              </p>
            </div>
            <p className="mb-4">
              The ad features a grayscale world where a mindless crowd watches a 'Big Brother' figure on a giant screen. A colorful athlete runs through the crowd and throws a sledgehammer into the screen, shattering the image just as a voiceover announces the launch of the Macintosh. The visual language is cinematic, borrowing directly from Orwell's dystopia to position Apple as the liberator and IBM as the unseen oppressor. The ad closes with: "On January 24th, Apple Computer will introduce Macintosh. And you'll see why 1984 won't be like <em>1984</em>."
            </p>

            <div className="embed-container mb-4 rounded overflow-hidden" style={{ border: '1px solid #ccc' }}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/VtvjbmoDx-I"
                title="Apple Macintosh 1984 Super Bowl Commercial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                style={{ border: 0 }} />
              
            </div>

            <AnalysisAccordion dimensions={appleDimensions} variant="mac" />
          </MacWindow>
        </div>

        {/* Ad #2: Lotus 1-2-3 */}
        <div ref={ad2Ref} className="reveal-right max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_02_Lotus123_1983.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #2
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                Lotus 1-2-3 "Introducing 1-2-3"
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Print Advertisement · 1983 · Business Magazines (Personal Computing)
              </p>
            </div>
            <p className="mb-4">
              A full-page print advertisement featuring a three-paneled layout displaying the software's ability to handle data, charts, and filing simultaneously on the IBM PC. The headline reads: "Introducing 1-2-3. It'll have your IBM/PC jumping through hoops." The ad is dense with technical specifications, feature lists, and functional descriptions, presenting the software as a comprehensive replacement for separate spreadsheet, database, and graphing tools.
            </p>

            <div className="rounded-lg overflow-hidden mb-4 border" style={{ borderColor: '#333' }}>
              <img
                src={lotusAd}
                alt="Lotus 1-2-3 1983 print advertisement - Introducing 1-2-3. It'll have your IBM/PC jumping through hoops."
                className="w-full h-auto"
                loading="lazy" />
              
            </div>

            <AnalysisAccordion dimensions={lotusDimensions} variant="mac" />
          </MacWindow>
        </div>
      </section>

      {/* ===== MAC DIALOG BOX ===== */}
      {!dialogDismissed &&
      <section className="mac-desktop py-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="mac-window">
              <div className="mac-titlebar">
                <span className="mac-titlebar-label">System Alert</span>
              </div>
              <div className="mac-body text-center py-8">
                <p className="font-mono text-sm mb-2 font-semibold">Initialize platform migration?</p>
                <p className="font-mono text-xs mb-6" style={{ color: '#888' }}>
                  Warning: you may not notice the transition.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                  className="font-pixel text-[9px] px-4 py-2 rounded-sm"
                  style={{ background: 'hsl(0 0% 90%)', border: '2px outset hsl(0 0% 80%)' }}
                  onClick={() => setDialogDismissed(true)}>
                    Cancel
                  </button>
                  <button
                  className="font-pixel text-[9px] px-4 py-2 rounded-sm"
                  style={{ background: 'hsl(210 50% 88%)', border: '2px outset hsl(210 50% 78%)' }}
                  onClick={() => setDialogDismissed(true)}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      {/* ===== ERA TRANSITION BAR ===== */}
      <section className="py-24 px-4 relative section-wipe" style={{ background: '#000' }}>
        <div ref={transitionRef} className="reveal-stagger max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-widest glitch-text mb-4" style={{ color: 'hsl(145, 80%, 50%)' }}>
            MIGRATING TO CLOUD... PLEASE WAIT
          </p>
          <p className="font-display text-2xl md:text-4xl font-bold mb-10" style={{ color: 'white' }}>
            1984 → 2024
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <div className="px-6 py-3 rounded-lg" style={{ background: 'rgba(0, 200, 200, 0.08)', border: '1px solid hsl(180, 100%, 30%)' }}>
              <p className="font-display text-base md:text-lg font-semibold tracking-wide" style={{ color: 'hsl(180, 100%, 75%)' }}>
                Buy the Box
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: 'hsl(180, 80%, 45%)' }}>$495, spec sheet, done</p>
            </div>
            <div className="font-display text-2xl font-light" style={{ color: 'hsl(145, 80%, 40%)' }}>→</div>
            <div className="px-6 py-3 rounded-lg" style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid hsl(270, 50%, 50%)' }}>
              <p className="font-display text-base md:text-lg font-semibold tracking-wide" style={{ color: 'hsl(270, 60%, 78%)' }}>
                Become the Platform
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: 'hsl(270, 40%, 50%)' }}>free to start, impossible to leave</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2020s ADS (Mode 2) ===== */}
      <section
        className="py-16 px-4"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, hsl(270, 60%, 18%), transparent 60%), radial-gradient(ellipse at 80% 50%, hsl(330, 50%, 20%), transparent 60%), hsl(270, 60%, 8%)'
        }}>

        <div className="max-w-4xl mx-auto mb-8">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-3" style={{ color: 'white' }}>
            2020s Advertisements
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] text-center mb-8" style={{ color: 'hsl(330, 90%, 65%)' }}>
            PLATFORM ERA
          </p>
        </div>

        {/* Ad #3: Notion */}
        <div ref={ad3Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="notion"
            sponsored
            verified
            caption="A multi-platform campaign running across outdoor, social media, and digital channels in which Notion's interface is displayed as the ad itself. Billboards, social media tiles, and digital placements all show the same visual: a clean Notion dashboard mid-task, accompanied by hand-drawn illustrations and the tagline 'All-in-one workspace for docs, wikis and projects' and 'Peace of mind across work and life.'"
            dimensions={notionDimensions}>

            <div className="w-full">
              <img
                src={notionCampaign1}
                alt="Notion All-in-one workspace campaign - social media tiles with hand-drawn illustrations and product UI"
                className="w-full h-auto"
                loading="lazy" />
              
              <img
                src={notionCampaign2}
                alt="Notion outdoor billboard campaign at a city bus stop showing the product interface at street level"
                className="w-full h-auto"
                loading="lazy" />
              
            </div>
          </InstagramCard>
          <div className="max-w-2xl mx-auto mt-2">
            <p className="font-mono text-xs text-center" style={{ color: 'hsl(0, 0%, 50%)' }}>
              2022–2024 · Outdoor, Instagram, TikTok, YouTube, Digital Display
            </p>
          </div>
        </div>

        {/* Ad #4: ChatGPT / OpenAI GPT-4o */}
        <div ref={ad4Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="openai"
            sponsored
            verified
            caption="A demonstration video showing a person talking to an AI in real-time. The AI responds with human-like emotion, solves math problems, and translates languages instantly. Presented as a 'Demo' rather than an advertisement, it doesn't ask you to buy — it invites you to try. The tool itself is so compelling that users share it for free, acting as unpaid advertisers."
            dimensions={chatgptDimensions}>

            <div className="embed-container">
              <iframe
                src="https://openai.com/index/hello-gpt-4o/?video=945586717"
                title="OpenAI Introducing GPT-4o Demo"
                allowFullScreen
                loading="lazy" />
              
            </div>
          </InstagramCard>
          <div className="max-w-2xl mx-auto mt-2">
            <p className="font-mono text-xs text-center" style={{ color: 'hsl(0, 0%, 50%)' }}>
              2024 · Social Media, Tech News Outlets
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMPARATIVE SUMMARY (Mode 2) ===== */}
      <section
        className="py-16 px-4"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, hsl(270, 50%, 15%), transparent 60%), hsl(270, 60%, 8%)'
        }}>

        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-10" style={{ color: 'white' }}>
            Comparative Summary
          </h3>

          <div ref={summaryRef} className="reveal-stagger grid md:grid-cols-2 gap-8 mb-12">
            {/* What Changed */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 className="font-display text-xl font-bold mb-4" style={{ color: 'hsl(145, 80%, 60%)' }}>
                What Changed
              </h4>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Software advertising shifted from selling a physical utility to selling a permanent digital environment. The focus moved from workplace efficiency to life optimization, where software now manages everything from office tasks to personal habits and sleep.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Marketing evolved from obvious, text-heavy magazine placements to social media content that blurs the line between recommendation and advertisement. Apple's 1984 ad was unmistakably a commercial event. OpenAI's GPT-4o demo is presented as a technology showcase, a piece of content so useful and shareable that users distribute it voluntarily.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                The revenue model transformed completely. Lotus 1-2-3 was a $495 box you bought once. Notion operates on freemium with escalating subscription tiers. OpenAI charges per usage through API calls. The advertising no longer needs to convince you to make a single purchase. It needs to establish a dependency that generates recurring revenue indefinitely.
              </p>
            </div>

            {/* What Stayed the Same */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 className="font-display text-xl font-bold mb-4" style={{ color: 'hsl(38, 95%, 60%)' }}>
                What Stayed the Same
              </h4>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Despite changes in technology, the psychological core of software advertising remains almost the same. Whether it was the promise of a faster spreadsheet or an AI-automated workflow, the central message is that efficiency is the key to success.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Advertising continues to use the 'fear' of missing out or being 'left behind' to pressure consumers into upgrading. Apple's 1984 ad warned that non-adoption meant conformity. OpenAI's demo implies that refusing AI augmentation means professional obsolescence. The emotional mechanism is identical across forty years: adopt or be left behind.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Both eras also sell identity through software. The Macintosh buyer was a creative rebel. The Lotus user was a modern executive. The Notion user is an aesthetically organised knowledge worker. The ChatGPT user is a cognitively augmented professional. The product changes. The identity purchase does not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTOR PERSPECTIVE (Mode 2) ===== */}
      <section
        className="py-16 px-4"
        style={{
          background: 'radial-gradient(ellipse at 70% 70%, hsl(330, 50%, 15%), transparent 60%), hsl(270, 60%, 8%)'
        }}>

        <div ref={perspectiveRef} className="reveal max-w-3xl mx-auto">
          <h3 className="font-display text-3xl md:text-5xl font-bold mb-3" style={{ color: 'white' }}>
            Sector Perspective
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] mb-8" style={{ color: 'hsl(330, 90%, 65%)' }}>
            INFORMATION TECHNOLOGY LENS
          </p>
          <div className="sector-perspective">
            <h4 className="font-display text-xl md:text-2xl font-bold mb-4" style={{ color: 'white' }}>
              Productivity Culture, Dependency, and the Platform as Identity
            </h4>
            <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Software advertising creates the "productivity culture" mindset by framing constant output and "optimized" workflows as the baseline for professional and personal worth. What began as selling time-saving tools has evolved into selling operating systems for your entire life.
            </p>
            <ul className="list-disc pl-5 space-y-4 font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              <li>
                The promise shifted from "save time" to "optimize your entire life." The narrative has evolved from automating tasks to free up leisure time to providing platforms that ensure every waking second is utilized for growth. Notion's "Peace of mind across work and life" tagline makes this explicit: the software does not distinguish between your professional output and your personal wellbeing. Both are systems to be managed.
              </li>
              <li>
                Subscription-based software reveals a structural shift where advertising focuses on maintaining a permanent psychological and financial dependency rather than a one-time utility. SaaS models mean the customer never owns the product. They rent access to their own workflows, and the advertising that brings them in is designed to make that dependency feel like empowerment.
              </li>
              <li>
                Platforms use network effects in their advertising by positioning their software as a standard, implying that refusing to join the network may cause you to miss out. When your colleagues, your university, and your industry all use Notion or Slack or ChatGPT, the advertising becomes the social pressure itself. The platform is not optional. It is infrastructure.
              </li>
              <li>
                When efficiency becomes identity, personal value is reduced to a set of performance metrics, leading to a "quantified self" where downtime is viewed as a systemic failure. The implications are measurable: software advertising has successfully reframed rest, reflection, and unproductive time as problems to be solved rather than human needs to be respected.
              </li>
            </ul>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(236, 72, 153, 0.2)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
              <span className="text-xs" style={{ color: 'hsl(330, 90%, 65%)' }}>L</span>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>Lamis</p>
              <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Information Technology</p>
            </div>
          </div>
        </div>
      </section>
    </div>);

}