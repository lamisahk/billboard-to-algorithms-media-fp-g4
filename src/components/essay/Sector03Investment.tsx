import MacWindow from "./MacWindow";
import AnalysisAccordion from "./AnalysisAccordion";
import InstagramCard from "./InstagramCard";
import { useState } from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import efHuttonAd from "@/assets/ad_1_sector_3.png";

/* ====== AD DATA ====== */

const efHuttonDimensions = [
{
  label: "Targeting methods",
  content: "Middle to upper-middle class adults with investable income, reached through magazine placements in publications read by professionals and business-minded readers. Watson's athletic celebrity broadened the appeal beyond the typical finance-industry audience, making the ad accessible to sports fans and general readers while maintaining aspirational professional framing."
},
{
  label: "Visibility of commercial intent",
  content: "High. The full-page format, brand logo, and explicit product tagline leave no ambiguity about what this is. However, the use of a celebrity testimonial softens the directness of the sales pitch by placing a trusted public figure between the brand and the reader."
},
{
  label: "Psychological techniques",
  content: "The ad uses authority transfer through celebrity endorsement, but with a specific twist. Watson is not famous for investing. He is famous for excelling under pressure and generating significant income through discipline. His role in the ad is to split the labour: he earns, E.F. Hutton grows. This division positions the firm as the expert partner of high achievers rather than a service for people who need financial guidance. It flatters the reader into identifying with Watson's position rather than evaluating the firm's actual credentials."
},
{
  label: "Ideological messaging",
  content: "The ad encodes the ideology that serious money requires serious institutional management, and that entrusting your wealth to E.F. Hutton is what a high-performing, disciplined person does. Financial success is framed as a partnership between the earner and the expert, with the firm positioned as the silent, indispensable second half of that equation. Wealth is not just a number. It is a practice that distinguishes the financially literate from everyone else."
},
{
  label: "Audience resistance",
  content: "Moderate. The print format made the commercial intent obvious and readers could turn the page. However, the combination of a respected sports figure and a confident, division-of-labour proposition created a persuasive framework that appealed to professional self-image. Resistance required rejecting not just the ad's claim but the identity it offered."
}];


const merrillDimensions = [
{
  label: "Targeting methods",
  content: "Affluent investors and high-net-worth individuals who may have had reservations about the scale of large financial institutions, reached through prime-time national television. The ad specifically addresses an audience sophisticated enough to recognise the china shop idiom and appreciate its inversion, suggesting a target demographic of educated, financially engaged adults rather than first-time investors."
},
{
  label: "Visibility of commercial intent",
  content: "High. The Merrill Lynch branding and tagline are explicit. However, the cinematic quality of the spot and the absence of any product information or financial claim gave it the feel of a brand statement rather than a sales pitch, which reduced the instinctive skepticism audiences bring to traditional advertising."
},
{
  label: "Psychological techniques",
  content: "The ad's central mechanism is preemptive objection handling. The china shop scenario immediately acknowledges what any rational investor might fear about a large, powerful firm: that its size makes it careless with your money. By showing the bull moving with extraordinary delicacy through a room full of breakable things, the ad converts the firm's most obvious liability into its primary selling point. Sensitivity and agility are not qualities typically associated with institutions of Merrill Lynch's scale, and the ad earns credibility precisely by acknowledging that tension rather than ignoring it."
},
{
  label: "Ideological messaging",
  content: "The ad encodes the ideology that institutional size and individual care are not in conflict, that a firm powerful enough to move markets is also careful enough to handle your personal financial goals with precision. This is a significant ideological claim because it directly contradicts the experience of most people dealing with large financial institutions. The bull becomes a symbol not of aggression or indifference but of disciplined, contained strength deployed in service of the individual client. Merrill Lynch is not a corporate machine. It is a breed apart."
},
{
  label: "Audience resistance",
  content: "Low to moderate. The metaphorical intelligence of the ad was genuinely disarming. Audiences who might otherwise approach a financial institution's advertising with skepticism were instead invited to appreciate a clever visual argument. Evaluating the ad critically required first stepping back from the pleasure of recognising the china shop reference and its inversion, which most viewers did not do. The emotional and aesthetic satisfaction of the concept did considerable persuasive work before any rational evaluation could begin."
}];


const robinhoodDimensions = [
{
  label: "Targeting methods",
  content: "Millennials and Gen Z investors, reached through a combination of mass broadcast during the Super Bowl and algorithmic social media distribution. Unlike E.F. Hutton's broad professional-class demographic, Robinhood specifically targeted individuals who had previously felt excluded from financial markets, people who had engaged with finance content online, followed meme stock discussions, or searched for beginner investment resources. The Super Bowl placement extended that digital reach into a mainstream broadcast moment."
},
{
  label: "Visibility of commercial intent",
  content: "Low to moderate. The ad is technically a Super Bowl commercial and therefore in an obviously commercial context. However, its content is so deliberately non-promotional, no products mentioned, no returns promised, no app features shown, that it operates more as a brand identity statement than an advertisement. It is selling a feeling of belonging and a political identity rather than a financial product, making the commercial intent easy to overlook."
},
{
  label: "Psychological techniques",
  content: "The ad's central mechanism is identity reassignment. By telling the audience \"you are already an investor,\" Robinhood bypasses the traditional sales dynamic entirely. There is no product to evaluate and no purchase to resist because the audience is being told something about themselves rather than asked to buy something. The ad also deploys political rehabilitation: it aired weeks after Robinhood had restricted trading during the GameStop saga and faced widespread accusations of favouring institutional investors over its own users. The \"we are all investors\" framing repositioned the brand as a democratic movement while avoiding any acknowledgment of the controversy."
},
{
  label: "Ideological messaging",
  content: "The campaign encodes the ideology that financial market participation is a democratic right rather than a professional privilege, and that Robinhood is the vehicle for exercising that right. This reframes the entire historical dynamic of investment advertising: where E.F. Hutton positioned expertise and institutional authority as the gateway to wealth, Robinhood positions them as unnecessary obstacles. The ideology is appealing but also convenient: it dissolves the distinction between informed investment and impulsive trading, which is the distinction on which Robinhood's revenue model depends."
},
{
  label: "Audience resistance",
  content: "Difficult. The identity framing preemptively neutralises commercial skepticism by making the viewer feel recognised and empowered rather than targeted. Criticising the ad feels like rejecting your own agency. The political rehabilitation dimension adds a further layer: questioning Robinhood's motives after a Super Bowl ad celebrating financial democracy feels cynical rather than critical."
}];


const coinbaseDimensions = [
{
  label: "Targeting methods",
  content: "A deliberately broad audience reached through Super Bowl placement, but with a self-selecting activation mechanism. Anyone who scanned the code opted in actively, providing Coinbase with a pool of confirmed high-intent users whose data then fed into subsequent algorithmic targeting. The fifteen dollar Bitcoin incentive was both a targeting tool and a conversion mechanism: it made sign-up feel like receiving a gift rather than making a financial commitment."
},
{
  label: "Visibility of commercial intent",
  content: "Extremely low in content, high in context. In a Super Bowl environment the ad is obviously commercial. But its content, a bouncing geometric shape with no text, no branding, and no product information, is the most stripped-back advertising format imaginable. The commercial intent is present but the commercial content has been entirely removed. What remains is pure curiosity."
},
{
  label: "Psychological techniques",
  content: "The ad relies entirely on FOMO and curiosity, which are among the most effective triggers for immediate action. The bouncing QR code creates anxiety through its simplicity: what is this, what happens if I scan it, what am I missing if I don't? The free Bitcoin offer then converts that anxiety into action through a loss-aversion mechanism: something is being given away and inaction means missing it. The gamification is complete by the time the viewer reaches the landing page, where they are already inside a financial platform before they have evaluated whether they want to be."
},
{
  label: "Ideological messaging",
  content: "Bitcoin is presented as an exciting, accessible, and democratic financial innovation, something anyone with a smartphone can participate in with no prior knowledge required. The ad encodes the ideology that digital assets represent a new financial order that bypasses the institutional gatekeepers of the 1980s. The irony is structural: Coinbase is itself a centralised platform that profits from the transactions of users who believe they are participating in a decentralised financial system. The ideology of liberation is the product."
},
{
  label: "Audience resistance",
  content: "Very low at the point of engagement. The fifteen dollar incentive and the gamified sign-up process are specifically designed to move users from curiosity to account creation before rational evaluation can occur. Users who scanned the code were already on the Coinbase platform before they had decided whether they wanted to invest in cryptocurrency. The ad's effectiveness, measured by app crashes and sign-up volumes, confirms that the resistance window was closed before it opened."
}];


/* ====== COMPONENT ====== */

export default function Sector03Investment() {
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
      <section className="mac-desktop desktop-investment py-24 px-4">
        <div ref={headerRef} className="reveal-blur max-w-4xl mx-auto text-center">
          <p className="font-pixel tracking-[0.3em] mb-4 text-sm text-white" style={{ color: 'hsl(180, 100%, 80%)' }}>
            SECTOR
          </p>
          <h2 className="font-display text-7xl md:text-9xl font-extrabold mb-4" style={{ color: 'white', textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
            03
          </h2>
          <h3 className="font-display text-2xl md:text-4xl font-bold tracking-wide mb-6" style={{ color: 'white' }}>
            INVESTMENT &amp; WEALTH-BUILDING
          </h3>
          <div className="inline-block px-4 py-2 rounded" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <p className="font-pixel text-[9px] tracking-wider" style={{ color: 'hsl(180, 100%, 85%)' }}>
              ALMAHA · ACCOUNTING
            </p>
          </div>
        </div>
      </section>

      {/* ===== INTRO WINDOW (Mode 1) ===== */}
      <section className="mac-desktop desktop-investment py-16 px-4">
        <div ref={introRef} className="reveal">
          <MacWindow title="sector_03_intro.txt">
            <p className="mb-4">
              Financial and investment advertising refers to promotional messaging designed to encourage people to invest in financial products including stocks, retirement funds, and emerging technologies like cryptocurrency. These advertisements do more than sell financial products. They shape how people think about money, wealth, class, and personal worth.
            </p>
            <p className="mb-4">
              This sector matters because investment advertising directly exploits one of the most universal anxieties in consumer culture: the fear of falling behind economically. By promising independence, security, and a desirable lifestyle, financial advertising positions its products as solutions to class anxiety and vehicles for economic mobility. Investment advertising does not just sell a product. It sells a social idea about what success looks like, who gets access to it, and how it is achieved.
            </p>
            <p>
              The sector evolved significantly between the 1980s and the 2020s. In the 1980s, investment advertising operated through television, newspapers, and print magazines. These advertisements were clearly identifiable as commercial messages, and they focused on projecting professionalism, institutional credibility, and long-term trust. The broker, the bank, and the firm were positioned as gatekeepers of financial wisdom that ordinary people needed to access through established channels. By the 2020s, the landscape had transformed entirely. Investment products now advertise through mobile applications, social media feeds, and online video platforms. These ads appear between entertainment and personal content, deliberately minimising their visibility as commercial messages. More significantly, the identity of the investor changed: the 2020s financial ad tells you that you are already an investor, that the market belongs to everyone, and that professional expertise is an obstacle rather than a resource. Despite this shift in format and tone, the core function stayed the same. Financial advertising in both eras promises wealth, freedom, and identity through commercial products.
            </p>
          </MacWindow>
        </div>
      </section>

      {/* ===== 1980s ADS (Mode 1) ===== */}
      <section className="mac-desktop desktop-investment py-16 px-4">
        <div className="max-w-4xl mx-auto mb-6">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-3" style={{ color: 'white', textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}>
            1980s Advertisements
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] text-center mb-8" style={{ color: 'hsl(180, 100%, 80%)' }}>
            BROADCAST ERA
          </p>
        </div>

        {/* Ad #1: E.F. Hutton */}
        <div ref={ad1Ref} className="reveal-left max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_01_EFHutton_1982.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #1
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                E.F. Hutton "When E.F. Hutton Talks, People Listen"
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Print Advertisement · 1982 · Business &amp; General Interest Magazines
              </p>
            </div>
            <p className="mb-4">
              A full-page magazine advertisement featuring professional golfer Tom Watson in a posed portrait, accompanying the copy: "I concentrate on making money. E.F. Hutton concentrates on making it grow." The ad closes on the campaign's signature line: "When E.F. Hutton talks, people listen." Watson is positioned not as an entertainer but as a high-earning professional, a man whose income is serious enough to require serious management. The implication is clear: if someone at this level of financial success trusts E.F. Hutton, you should too.
            </p>

            {/* EF Hutton ad image */}
            <div className="rounded-lg overflow-hidden mb-4 border" style={{ borderColor: '#333' }}>
              <img
                src={efHuttonAd}
                alt="E.F. Hutton 1982 print advertisement featuring Tom Watson - 'I concentrate on making money. E.F. Hutton concentrates on making it grow.'"
                className="w-full h-auto"
                loading="lazy" />
              
            </div>

            <AnalysisAccordion dimensions={efHuttonDimensions} variant="mac" />
          </MacWindow>
        </div>

        {/* Ad #2: Merrill Lynch */}
        <div ref={ad2Ref} className="reveal-right max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_02_MerrillLynch_1981.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #2
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                Merrill Lynch "A Breed Apart"
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Television Commercial · 1981 · National Broadcast
              </p>
            </div>
            <p className="mb-4">
              A sixty-second spot in which Merrill Lynch's bull moves slowly and deliberately through a room filled floor to ceiling with fine crystal. The setting is immediately recognisable as a subversion of the idiom "bull in a china shop." Rather than causing destruction, the bull moves with precision and calm, navigating the fragile environment without a single breakage. The voiceover states: "Picking and choosing the right investments requires very careful handling. One wrong move can easily damage the best laid plans. At Merrill Lynch, we know that size and strength can be very valuable. But it is our sensitivity to your investment goals, and agility in helping you reach them, that makes us what we are. Merrill Lynch: a breed apart."
            </p>

            <div className="embed-container mb-4 rounded overflow-hidden" style={{ border: '1px solid #ccc' }}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/FMKd1NkTEB8"
                title="Merrill Lynch A Breed Apart 1981"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                style={{ border: 0 }}>
              </iframe>
            </div>

            <AnalysisAccordion dimensions={merrillDimensions} variant="mac" />
          </MacWindow>
        </div>
      </section>

      {/* ===== MAC DIALOG BOX ===== */}
      {!dialogDismissed &&
      <section className="mac-desktop desktop-investment py-16 px-4">
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
            DECENTRALISING... PLEASE WAIT
          </p>
          <p className="font-display text-2xl md:text-4xl font-bold mb-10" style={{ color: 'white' }}>
            1982 → 2022
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <div className="px-6 py-3 rounded-lg" style={{ background: 'rgba(0, 200, 200, 0.08)', border: '1px solid hsl(180, 100%, 30%)' }}>
              <p className="font-display text-base md:text-lg font-semibold tracking-wide" style={{ color: 'hsl(180, 100%, 75%)' }}>
                Trust the Experts
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: 'hsl(180, 80%, 45%)' }}>defer, delegate, belong</p>
            </div>
            <div className="font-display text-2xl font-light" style={{ color: 'hsl(145, 80%, 40%)' }}>→</div>
            <div className="px-6 py-3 rounded-lg" style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid hsl(270, 50%, 50%)' }}>
              <p className="font-display text-base md:text-lg font-semibold tracking-wide" style={{ color: 'hsl(270, 60%, 78%)' }}>
                You Are the Expert
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: 'hsl(270, 40%, 50%)' }}>scan it, swipe it, you were born one</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2020s ADS (Mode 2) ===== */}
      <section
        className="py-16 px-4"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(212,144,26,0.2), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(212,144,26,0.1), transparent 60%), #2A1A04'
        }}>
        
        <div className="max-w-4xl mx-auto mb-8">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-3" style={{ color: 'white' }}>
            2020s Advertisements
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] text-center mb-8" style={{ color: 'hsl(330, 90%, 65%)' }}>
            ALGORITHMIC ERA
          </p>
        </div>

        {/* Ad #3: Robinhood */}
        <div ref={ad3Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="robinhood"
            sponsored
            verified
            caption="A thirty-second Super Bowl spot that opens with a voiceover asking &quot;Don't think you're an investor?&quot; as footage cuts between ordinary people going about their day: a morning jogger, a dog walker, a shop owner, someone dyeing their hair in a bathroom, a cafe owner. The voiceover continues: &quot;We make investments morning, noon and night.&quot; The final line lands: &quot;You don't need to become an investor. You were born one.&quot;"
            dimensions={robinhoodDimensions}>
            
            <div className="embed-container">
              <iframe
                src="https://www.youtube.com/embed/pmdozXl4T4E"
                title="Robinhood We Are All Investors"
                allowFullScreen
                loading="lazy" />
              
            </div>
          </InstagramCard>
          <div className="max-w-2xl mx-auto mt-2">
            <p className="font-mono text-xs text-center" style={{ color: 'hsl(0, 0%, 50%)' }}>
              2021 · Super Bowl LV, YouTube, Social Media
            </p>
          </div>
        </div>

        {/* Ad #4: Coinbase */}
        <div ref={ad4Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="coinbase"
            sponsored
            verified
            caption="A sixty-second Super Bowl spot consisting of nothing but a coloured QR code bouncing slowly around a black screen, changing colour each time it hits an edge, set to gentle music. No voiceover. No branding until the final seconds. Viewers who scanned the code were directed to a Coinbase landing page offering fifteen dollars in free Bitcoin upon sign-up. The ad generated so much traffic that the Coinbase app crashed."
            dimensions={coinbaseDimensions}>
            
            <div className="embed-container">
              <iframe
                src="https://www.youtube.com/embed/uJ9pNQrz0fA"
                title="Coinbase QR Code Super Bowl"
                allowFullScreen
                loading="lazy" />
              
            </div>
          </InstagramCard>
          <div className="max-w-2xl mx-auto mt-2">
            <p className="font-mono text-xs text-center" style={{ color: 'hsl(0, 0%, 50%)' }}>
              2022 · Super Bowl LVI, Smartphone QR activation
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMPARATIVE SUMMARY (Mode 2) ===== */}
      <section
        className="py-16 px-4"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(212,144,26,0.15), transparent 60%), #2A1A04'
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
                The most fundamental shift is in who is framed as the legitimate investor. In the 1980s, E.F. Hutton and Merrill Lynch both operated from the assumption that financial knowledge was held by institutions and professionals, and that the role of the ordinary person was to access that knowledge through the right firm. The investor was someone who needed guidance, who deferred to expertise, and who built wealth through long-term relationships with established brokerages. The ads sold trust in institutions.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                By the 2020s, that entire framework had been inverted. Robinhood told its audience they were already investors without needing to become one. Coinbase offered free cryptocurrency to anyone who could point a phone at a television screen. The gatekeepers of the 1980s were gone, replaced by apps that framed professional financial advice as an unnecessary obstacle to individual market participation. The ideology shifted from institutional trust to radical self-directed investment.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Delivery methods changed with equal consequence. The 1980s campaigns were broadcast spectacles: cinematic, expensive, and distributed simultaneously to mass audiences with no targeting or feedback. By the 2020s, Robinhood and Coinbase used Super Bowl placement not as an endpoint but as a trigger for digital follow-up, with algorithmic retargeting reaching users who engaged with the broadcast content across all their subsequent digital activity. The ad was no longer a message delivered once. It was the beginning of a persistent behavioural relationship.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Visibility declined sharply. The E.F. Hutton and Merrill Lynch campaigns were clearly identifiable as corporate advertising. Coinbase's floating QR code provided almost no commercial information at all. Robinhood's Super Bowl spot mentioned no products and made no financial claims. The commercial intent was present but the commercial content had been stripped away, leaving only emotional and identity-based messaging.
              </p>
            </div>

            {/* What Stayed the Same */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 className="font-display text-xl font-bold mb-4" style={{ color: 'hsl(38, 95%, 60%)' }}>
                What Stayed the Same
              </h4>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                The core mechanism has not changed at all. Every ad in both eras begins by identifying a gap between where the audience is financially and where they could be, and then positions a product as the bridge. E.F. Hutton created the gap by implying the audience was missing crucial financial knowledge. Merrill Lynch created it by associating wealth with national belonging. Robinhood created it by suggesting that not using the app meant remaining outside a democratic financial movement. Coinbase created it with a countdown and a QR code. The dissatisfaction, and the product solution, are constant.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Both eras also link financial products directly to personal identity and social belonging. The American Express card told the 1980s professional that she was a member of a deserving establishment. Robinhood told the 2021 millennial that he was already an investor and therefore already part of something larger than himself. The financial product in both cases is a badge, not just a service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTOR PERSPECTIVE (Mode 2) ===== */}
      <section
        className="py-16 px-4"
        style={{
          background: 'radial-gradient(ellipse at 70% 70%, rgba(212,144,26,0.15), transparent 60%), #2A1A04'
        }}>
        
        <div ref={perspectiveRef} className="reveal max-w-3xl mx-auto">
          <h3 className="font-display text-3xl md:text-5xl font-bold mb-3" style={{ color: 'white' }}>
            Sector Perspective
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] mb-8" style={{ color: 'hsl(330, 90%, 65%)' }}>ACCOUNTING LENS

          </p>
          <div className="sector-perspective">
            <h4 className="font-display text-xl md:text-2xl font-bold mb-4" style={{ color: 'white' }}>
              Anxiety, Gamification, and Wealth as Identity
            </h4>
            <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Financial advertising creates and exploits economic anxiety as its primary business model. Rather than addressing genuine financial needs, these campaigns first manufacture the sense that the viewer's current financial position is insufficient, then sell a product as the corrective. E.F. Hutton manufactured the anxiety of missing professional insight. Coinbase manufactured the anxiety of missing a free asset. The emotional mechanism is identical. Only the vocabulary changes.
            </p>
            <ul className="list-disc pl-5 space-y-4 font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              <li>
                The gamification of investing, visible in Robinhood's interface design and Coinbase's QR code mechanics, reveals something significant about what modern financial advertising actually sells. Both platforms are structured to reduce the friction between impulse and financial action, which is precisely the opposite of what responsible investing requires. Robinhood's app design was specifically cited by Massachusetts regulators as targeting inexperienced investors through features that treat trading like a game, and the SEC found that Robinhood's payment-for-order-flow model cost its users an estimated $34 million through poorly priced trades while the company collected fees from institutional market makers. The democratisation narrative obscures an extractive commercial logic.
              </li>
              <li>
                Wealth in both eras is presented as identity and lifestyle rather than a number on a balance sheet. Merrill Lynch did not sell investment returns. It sold patriotic optimism and the identity of someone who believes in America's future. Robinhood does not sell investment returns either. It sells membership in a democratic financial movement and the identity of someone who has taken control of their own financial future. The actual financial outcomes for investors in both cases are secondary to the emotional and social identity that the product promises.
              </li>
              <li>
                The implication of wealth-building becoming a personality trait rather than financial planning is measurable and serious. When investing is reframed as identity, risk evaluation becomes socially costly: to question an investment is to question one's own membership in the community of empowered investors. The meme stock phenomenon of January 2021, in which retail investors collectively purchased GameStop shares in a coordinated social action rather than a financial calculation, is the most visible recent example of what happens when financial advertising successfully converts investment from a planning activity into an identity performance. The losses were real. The identity, for many, was the point.
              </li>
            </ul>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(236, 72, 153, 0.2)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
              <span className="text-xs" style={{ color: 'hsl(330, 90%, 65%)' }}>A</span>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>Almaha</p>
              <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Accounting</p>
            </div>
          </div>
        </div>
      </section>
    </div>);

}