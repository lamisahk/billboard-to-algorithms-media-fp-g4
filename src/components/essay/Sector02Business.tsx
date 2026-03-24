import MacWindow from "./MacWindow";
import AnalysisAccordion from "./AnalysisAccordion";
import InstagramCard from "./InstagramCard";
import { useState } from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

/* ====== AD DATA ====== */

const ibmDimensions = [
{
  label: "Targeting methods",
  content: "Small business owners and non-technical individuals intimidated by computing. IBM reached this audience through mainstream television and print, using the Little Tramp to personify the everyman struggling to keep pace with a changing professional environment, deliberately making the personal computer feel approachable rather than threatening."
},
{
  label: "Visibility of commercial intent",
  content: "Very high. The ad moved away from subtle corporate branding toward a bold narrative style, but the commercial intent was never in doubt. The IBM logo is prominent, the product's purpose is clearly stated, and an explicit voiceover at the end names the \"IBM Personal Computer\" directly."
},
{
  label: "Psychological techniques",
  content: "Celebrity branding through the Little Tramp creates instant audience identification. The psychological masterstroke is sympathy: if even this famously clumsy, struggling everyman can master the machine, anyone can. The ad sells an identity of empowered competence by lowering the barrier of self-doubt."
},
{
  label: "Ideological messaging",
  content: "The ad encodes the ideology of democratised productivity: the PC shifts from a tool of bureaucracy into a liberating personal asset for the ordinary worker. By using a character who represents the common man, IBM sells the idea that individual agency over one's own labour is now achievable through technology. Work competence becomes something you purchase and install."
},
{
  label: "Audience resistance",
  content: "Recognising this as an advertisement was easy. Resisting the persuasion was harder. The nostalgia and warmth of the Little Tramp created a disarming effect that made purchasing the IBM PC feel like receiving a friendly tip rather than responding to a sales campaign for expensive technology."
}];


const amexDimensions = [
{
  label: "Targeting methods",
  content: "Affluent business professionals and aspirational upwardly mobile workers, reached through prime-time television and premium print media. The campaign did not target broadly: it targeted people who wanted to be seen as belonging to an establishment that the card represented. The $55 annual membership fee itself functioned as a targeting mechanism, filtering for consumers willing to pay for status."
},
{
  label: "Visibility of commercial intent",
  content: "High. The ads were clearly formatted as television commercials with consistent brand presentation and tagline. What was less obvious was the nature of what was being sold. The card's actual financial features were almost never mentioned. The product being sold was social position."
},
{
  label: "Psychological techniques",
  content: "The campaign operates entirely through exclusivity and social proof. By framing cardholders as \"members\" rather than customers, American Express repositioned a financial transaction as entry into a club. The rite-of-passage framing, particularly the father-and-son lawyer spot, ties the card to professional legitimacy and generational inheritance of status. Owning the card becomes evidence that you have arrived."
},
{
  label: "Ideological messaging",
  content: "The ad encodes the ideology that professional success is a social identity confirmed by the objects you carry and the establishments that recognise you. The card does not help you do your work better. It signals to others that you are the kind of person who belongs among those who matter. Success in this framing is not about competence but about membership, and membership is something you pay for annually."
},
{
  label: "Audience resistance",
  content: "Moderate. The commercial intent was obvious. The aspiration, however, was difficult to dismiss because the campaign tapped into something real: professional environments in the 1980s were deeply status-conscious, and the signals you sent through your wallet, your suit, and your restaurant choices carried genuine social weight. The ad did not fabricate that dynamic. It monetised it."
}];


const masterclassDimensions = [
{
  label: "Targeting methods",
  content: "Aspirational professionals in creative industries and ambitious strivers who believe consuming elite content is a shortcut to elite status. Unlike the 1980s, MasterClass deploys algorithmic behavioral targeting on Instagram and YouTube, exposing ads specifically to users whose browsing history signals interest in Vogue, leadership, and career advancement. Retargeting ensures the ad reappears across platforms after a single engagement, creating an omnipresent brand presence that mirrors the \"always-on\" professional identity the course itself promotes."
},
{
  label: "Visibility of commercial intent",
  content: "Low to moderate. The trailer adopts a cinematic documentary aesthetic that deliberately blurs the line between educational content and promotional material. It feels like a personal invitation to observe a private world rather than a sales pitch for a subscription service. The audience is positioned as a potential insider, not a customer."
},
{
  label: "Psychological techniques",
  content: "The ad induces aspirational anxiety: it implies there is exclusive knowledge and access that separates elite professionals from everyone else, and purchasing the MasterClass is the only route to that access. Authority bias operates through Wintour's status, her decades of industry dominance lending the content an unquestionable credibility. The combination creates a purchase that feels like closing an information gap rather than spending money."
},
{
  label: "Ideological messaging",
  content: "The ad promotes the ideology that there is no meaningful division between private personality and professional brand. Success is presented as a curated performance of confidence, style, and vision that can be learned and purchased. The identity being sold is \"the personal brand as professional capital\": to be successful, you must transform your entire self into a marketable product, and the first purchase on that journey is this one."
},
{
  label: "Audience resistance",
  content: "For a critical audience, resistance is possible. Wintour's specific leadership style, widely characterised as demanding and cold, can read as outdated in a professional culture increasingly oriented around collaboration and psychological safety. A viewer who recognises this may dismiss the MasterClass as a high-priced subscription built around a management model that no longer applies. However, for the aspirational target audience, that critical distance is unlikely to activate."
}];


const mondayDimensions = [
{
  label: "Targeting methods",
  content: "A broad audience of computer-based professionals, whether in-office or remote, along with managers and team leaders frustrated by rigid workflows. The Super Bowl slot delivered mass brand awareness across organisational levels simultaneously. Digital retargeting on LinkedIn and YouTube then ensured the ad reappeared in the personal feeds of anyone who engaged with it, creating the \"always-on\" brand presence the ad itself glorifies."
},
{
  label: "Visibility of commercial intent",
  content: "High in placement, deceptive in style. The Super Bowl context makes it unmistakably a commercial. However, by replacing the typical software features demonstration with high-energy cinematic visuals, Monday.com made the ad feel like entertainment content rather than a product pitch. The sales intent is structurally present but aesthetically hidden."
},
{
  label: "Psychological techniques",
  content: "The ad creates a \"flow state\" fantasy, suggesting that work does not have to be a grind. It appeals to the desire for mastery and effortlessness, presenting the software as a superpower that removes friction from professional life. The employees levitating and breaking through the ceiling provide visual catharsis: emotional release from the weight of institutional constraint. The viewer is invited to identify not as a managed employee but as an uncontained high performer."
},
{
  label: "Ideological messaging",
  content: "The ad promotes the belief that professional success in the 2020s is no longer tied to corporate hierarchy or physical location but to personal mastery of digital systems. It sells the identity of the \"boundless digital professional,\" suggesting that the right tools dissolve institutional limits entirely. This reinforces a neoliberal ideology of radical self-reliance in which the boundary between private and professional self is erased, and the modern worker is always capable of producing results from anywhere at any time."
},
{
  label: "Audience resistance",
  content: "For a critically aware audience, resistance is relatively accessible. The promise of \"limitless\" work reads as ironic to many burned-out professionals who recognise that \"all-in-one\" platforms often increase micromanagement and surveillance rather than reducing them. The gravity-defying office fantasy is easily identified as corporate spectacle. However, for workers who genuinely feel trapped by stagnant workflows, the emotional pull of the visual catharsis is real and not easily dismissed."
}];


/* ====== COMPONENT ====== */

export default function Sector02Business() {
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
            02
          </h2>
          <h3 className="font-display text-2xl md:text-4xl font-bold tracking-wide mb-6" style={{ color: 'white' }}>
            BUSINESS &amp; PROFESSIONAL IDENTITY
          </h3>
          <div className="inline-block px-4 py-2 rounded" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <p className="font-pixel text-[9px] tracking-wider" style={{ color: 'hsl(180, 100%, 85%)' }}>
              HIBA · GENERAL BUSINESS
            </p>
          </div>
        </div>
      </section>

      {/* ===== INTRO WINDOW (Mode 1) ===== */}
      <section className="mac-desktop py-16 px-4">
        <div ref={introRef} className="reveal">
          <MacWindow title="sector_02_intro.txt">
            <p className="mb-4">
              Business and professional advertising focuses on building strategic relationships and institutional authority, enabling identity construction for both corporations and individuals to cultivate a "trustworthy" image that attracts high-level opportunities. Unlike consumer-focused advertising that targets personal desires, this sector addresses specialised individuals who influence organisational decisions.
            </p>
            <p className="mb-4">
              It is a primary driver of identity construction because it establishes the cultural standard for what "success" looks like. Ads in this sector consistently project an ideal professional self, leading individuals to believe that purchasing certain products or acquiring certain associations brings them closer to that idealised version of themselves. This creates a halo effect, where a polished professional aesthetic becomes subconsciously equated with actual competence and reliability. Advertising in this sector also heavily influences work-life identity: by glorifying specific corporate cultures, it pressures individuals to merge their personal values with professional expectations, blurring the boundary between authentic identity and the "always-on" career persona.
            </p>
            <p>
              The evolution from the 1980s to the 2020s marks a transition from institutional branding to individual influence. In the 1980s, the focus was on the organisation as a whole, building massive corporate recognition through mass media. By the 2020s, the focus shifted to the identities of individual employees, where the personal professional brand of the worker became the primary evidence of a company's trust and expertise.
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
            BROADCAST ERA
          </p>
        </div>

        {/* Ad #1: IBM PC */}
        <div ref={ad1Ref} className="reveal-left max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_01_IBM_PC_1981.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #1
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                IBM PC "Little Tramp"
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Television Commercial · 1981 · National Broadcast
              </p>
            </div>
            <p className="mb-4">
              A one-minute ad in which Charlie Chaplin's character the Little Tramp struggles to manage a chaotic small business, fumbling with cake packaging and falling behind. He visits IBM computer experts for guidance. Once shown how to use the IBM PC, he becomes organised, productive, and in control, balancing his books with ease. The ad closes with the text: "Your own IBM Personal Computer. Try it at a store near you."
            </p>

            <div className="embed-container mb-4 rounded overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/NFmHn6DJOZs"
                title="IBM PC Little Tramp 1981"
                allowFullScreen
                loading="lazy" />
              
            </div>

            <AnalysisAccordion dimensions={ibmDimensions} variant="mac" />
          </MacWindow>
        </div>

        {/* Ad #2: American Express */}
        <div ref={ad2Ref} className="reveal-right max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_02_AmEx_1987.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #2
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                American Express "Membership Has Its Privileges"
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Television Campaign · 1987 · National Broadcast + Print
              </p>
            </div>
            <p className="mb-4">
              A ninety-second television spot structured as a series of crisis vignettes. A man loses his wallet abroad and is immediately recognised as a cardmember, with a replacement card promised by the next day. A couple loses their card, cash, and passport and are told they have "come to the right place." A traveler leaves prescription medicine at home and is connected to Global Assist. A family arrives late at a hotel and finds a room waiting. A woman abroad is found an English-speaking attorney. Each vignette ends with the same resolution: the American Express cardmember is taken care of, no matter where they are or what goes wrong. The ad closes on the line: "Members carry our promise of respect, recognition, and unsurpassed personal service. Membership has its privileges."
            </p>

            <div className="embed-container mb-4 rounded overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/utKqd6Md_bs"
                title="American Express Membership Has Its Privileges 1987"
                allowFullScreen
                loading="lazy" />
              
            </div>

            <AnalysisAccordion dimensions={amexDimensions} variant="mac" />
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
                <p className="font-mono text-sm mb-2 font-semibold">Jump to present day?</p>
                <p className="font-mono text-xs mb-6" style={{ color: '#888' }}>
                  Warning: the ads get harder to recognise.
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
            UPLOADING TO THE CLOUD... PLEASE WAIT
          </p>
          <p className="font-display text-2xl md:text-4xl font-bold mb-10" style={{ color: 'white' }}>
            1981 → 2022
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <div className="px-6 py-3 rounded-lg" style={{ background: 'rgba(0, 200, 200, 0.08)', border: '1px solid hsl(180, 100%, 30%)' }}>
              <p className="font-display text-base md:text-lg font-semibold tracking-wide" style={{ color: 'hsl(180, 100%, 75%)' }}>
                Corporate Ladder
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: 'hsl(180, 80%, 45%)' }}>climb it, earn it, belong</p>
            </div>
            <div className="font-display text-2xl font-light" style={{ color: 'hsl(145, 80%, 40%)' }}>→</div>
            <div className="px-6 py-3 rounded-lg" style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid hsl(270, 50%, 50%)' }}>
              <p className="font-display text-base md:text-lg font-semibold tracking-wide" style={{ color: 'hsl(270, 60%, 78%)' }}>
                Personal Brand
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: 'hsl(270, 40%, 50%)' }}>curate it, perform it, always on</p>
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
            ALGORITHMIC ERA
          </p>
        </div>

        {/* Ad #3: MasterClass */}
        <div ref={ad3Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="masterclass"
            sponsored
            verified
            caption="A trailer featuring Anna Wintour, Editor-in-Chief of Vogue, shot in documentary style alternating between fast-paced behind-the-scenes runway footage and direct-to-camera leadership advice. The visual language mimics a high-end biographical documentary rather than a course advertisement."
            dimensions={masterclassDimensions}>
            
            <div className="embed-container">
              <iframe
                src="https://www.youtube.com/embed/XVP6JKoElQs"
                title="MasterClass Anna Wintour"
                allowFullScreen
                loading="lazy" />
              
            </div>
          </InstagramCard>
          <div className="max-w-2xl mx-auto mt-2">
            <p className="font-mono text-xs text-center" style={{ color: 'hsl(0, 0%, 50%)' }}>
              2020 · YouTube, Instagram, Facebook
            </p>
          </div>
        </div>

        {/* Ad #4: Monday.com */}
        <div ref={ad4Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="mondaydotcom"
            sponsored
            verified
            caption="A thirty-second Super Bowl spot in which office employees transform a printer into a high-speed vehicle, ride through the office, build stairs mid-air, levitate, and collectively burst through the building's glass ceiling into open sky. The visual metaphor replaces the rigid, hierarchical 1980s office with a 2020s vision of limitless, agile, technology-enabled collaboration."
            dimensions={mondayDimensions}>
            
            <div className="embed-container">
              <iframe
                src="https://www.youtube.com/embed/JoJ4O8xyC3M"
                title="Monday.com Work Without Limits"
                allowFullScreen
                loading="lazy" />
              
            </div>
          </InstagramCard>
          <div className="max-w-2xl mx-auto mt-2">
            <p className="font-mono text-xs text-center" style={{ color: 'hsl(0, 0%, 50%)' }}>
              2022 · Super Bowl LVI, LinkedIn, YouTube
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
                The transition marks a fundamental shift in the success narrative: from climbing a corporate ladder to continuously performing an entrepreneurial self.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                In the 1980s, ads like the IBM PC and American Express focused on the relationship between an individual and an institutional structure. Success meant finding the right tools and earning the right markers to navigate a corporate system. The IBM PC made the worker more efficient within that system. The American Express card signalled that you had arrived within it. By the 2020s, MasterClass presents professionalism as a curated performance of personal style rather than a title granted by a company. The Monday.com worker does not navigate the corporate structure. She levitates above it and breaks through the ceiling.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Delivery methods evolved from mass-market spectacle to algorithmic precision. American Express and IBM used broad television broadcasts to build institutional recognition across demographics. By the 2020s, behavioral retargeting follows individuals across social media feeds, making ads feel less like traditional sales pitches and more like native content.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Language shifted from competence to omnipotence. 1980s ads offered sympathy and familiarity, suggesting that anyone could master the tools of productivity. 2020s ads offer transformation, suggesting that success is no longer a destination reached by promotion but a psychological state that must be maintained through the constant purchase of new tools and expert knowledge. The anxiety being exploited is no longer the fear of falling behind a new technology. It is the fear of failing to continuously become a better version of yourself.
              </p>
            </div>

            {/* What Stayed the Same */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 className="font-display text-xl font-bold mb-4" style={{ color: 'hsl(38, 95%, 60%)' }}>
                What Stayed the Same
              </h4>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                The core psychological engine has not changed. This sector has always relied on three mechanisms: linking products to professional success, manufacturing career anxiety, and defining success through consumption.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Both eras exploit professional insecurity by suggesting that not purchasing the featured product or service means stagnation while everyone else progresses. The IBM PC ad warns that the everyman worker will be overwhelmed without it. The Monday.com ad warns that without the software, your workflow stays stuck while everyone else levitates. Both the American Express card and the MasterClass subscription sell social proof: evidence that the purchaser belongs among those who matter. The fundamental premise across forty years is identical. Competence is something you buy. The product is the bridge between your current professional self and the version of yourself that belongs.
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
            GENERAL BUSINESS LENS
          </p>
          <div className="sector-perspective">
            <h4 className="font-display text-xl md:text-2xl font-bold mb-4" style={{ color: 'white' }}>
              Success, Hustle Culture, and the Erosion of Private Life
            </h4>
            <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
              The concept of success in business advertising shifted from institutional stability to a process of continuous personal advancement. In the 1980s, success was defined by ascending within a corporate structure to a position that validated your professional status. By the 2020s, success is reframed as a state of perpetual self-brand growth where professional value is measured by human capital in a volatile digital economy, and is never truly reached but always in progress.
            </p>
            <ul className="list-disc pl-5 space-y-4 font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              <li>
                Hustle culture advertising reveals a modern work ideology rooted in radical self-reliance. The glorification of the "grind" and the pursuit of 24/7 professional growth embed the belief that individual failure is never the result of a flawed system but always a personal failure to work hard enough. The structure disappears from view. Only the individual and her choices remain visible.
              </li>
              <li>
                Modern advertising in this sector sells a high-performance identity rather than a tool. The MasterClass ad does not promote a course. It sells the social proof that the viewer is the kind of ambitious, elite professional who invests in herself. The product becomes a psychological badge, evidence that the consumer belongs to an enlightened professional class. The purchase is not of knowledge. It is of the halo that validates professional existence.
              </li>
              <li>
                When advertising succeeds in merging a professional persona with an authentic self, the primary consequence is the erosion of private life. If work is your entire identity, rest is no longer a human right but simply recharging the asset for future production. This creates a fragile dependency on external markers: task completion rates, LinkedIn engagement, professional validation from platforms and peers. The result is a society of persistent burnout in which individuals struggle to find value in themselves outside their marketability, and the boundary between the private self and the always-on career persona disappears entirely.
              </li>
            </ul>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(236, 72, 153, 0.2)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
              <span className="text-xs" style={{ color: 'hsl(330, 90%, 65%)' }}>H</span>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>Hiba</p>
              <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>General Business</p>
            </div>
          </div>
        </div>
      </section>
    </div>);

}