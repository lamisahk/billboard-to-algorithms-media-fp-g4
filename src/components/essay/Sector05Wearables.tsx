import MacWindow from "./MacWindow";
import AnalysisAccordion from "./AnalysisAccordion";
import InstagramCard from "./InstagramCard";
import { useState } from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

/* ====== AD DATA ====== */

const walkmanDimensions = [
{
  label: "Targeting methods",
  content: "Young upwardly mobile adults aged 18 to 35, reached through prime-time television and aspirational lifestyle publications. The campaign used both sports and music celebrity endorsements to reach fitness-oriented and culturally engaged audiences simultaneously. The editorial placement in publications like Esquire targeted a financially secure male demographic while television placements ensured broader reach."
},
{
  label: "Visibility of commercial intent",
  content: "Very high. The Sony logo and product name are prominent throughout. There is no attempt to disguise the commercial nature of the messaging. The ads are clearly formatted as product advertisements with explicit branding."
},
{
  label: "Psychological techniques",
  content: "The primary mechanism is escapism and the fantasy of personal autonomy. Every visual in the campaign depicts the Walkman user as someone who has successfully created their own private sonic world within a shared physical space. Jogging alone, commuting alone, moving through crowds while internally elsewhere: the device promises a personal freedom that exists independent of external circumstances. The aspiration being sold is not the device itself but the emotional state it enables."
},
{
  label: "Ideological messaging",
  content: "The Walkman campaign encodes the ideology of the self-contained individual: the person who has control over their own sensory environment and does not need to share the soundtrack of their life with anyone else. This was genuinely novel in 1980. Before personal audio, music was communal: the radio in the kitchen, the record player in the living room. The Walkman sold the idea that your audio world was yours alone, and that this privacy was a form of liberation. The device implicitly encouraged a kind of anti-conformism: you do not have to listen to what everyone else is listening to."
},
{
  label: "Audience resistance",
  content: "Low. The novelty of the product was so complete, and the emotional appeal of personal freedom so direct, that critical resistance was structurally difficult. There was no established media literacy framework for evaluating personal technology advertising in 1980. The product was also genuinely new in a way that made the aspiration it sold feel entirely plausible."
}];


const casioDimensions = [
{
  label: "Targeting methods",
  content: "Professional adults and university students who needed multifunctional portable devices. The decision to air the ad during M*A*S*H, a programme with a well-documented middle-income, educated adult demographic, reflects deliberate targeting of pragmatic professionals aged 30 to 50 who would respond to efficiency and value arguments."
},
{
  label: "Visibility of commercial intent",
  content: "Very high. The ad is transparently a product demonstration with clear branding, feature showcasing, and price disclosure. Bert Parks speaks directly to the camera in the manner of a product presenter, making the commercial intent completely unambiguous."
},
{
  label: "Psychological techniques",
  content: "The primary appeal is to rationality and efficiency, using a \"best of both worlds\" argument: why buy a calculator and a watch separately when this single device delivers both? This appeals to the educated, pragmatic audience's sense of intelligent decision-making. The use of Parks, a trusted and familiar television personality, adds a layer of social proof and warmth that softens the purely functional pitch."
},
{
  label: "Ideological messaging",
  content: "The ad encodes the ideology of the intellectually capable, economically prudent professional who embraces new technology as a form of smart living. It positions the Casio calculator watch as the choice of someone who understands that the future of personal devices is convergence: one object replacing many. This framing places the buyer at the leading edge of a new era of personal computing, participating in a technological transformation that is beginning at the wrist."
},
{
  label: "Audience resistance",
  content: "Moderate. The rational, product-focused nature of the ad makes it straightforward to evaluate critically. However, the implied identity of the smart, forward-thinking professional who recognises value when he sees it is subtly flattering and harder to resist than it first appears."
}];


const appleWatchDimensions = [
{
  label: "Targeting methods",
  content: "Advanced algorithmic targeting across demographic segments including health-conscious adults, older parents buying for elderly relatives, athletes, and people managing chronic medical conditions. Apple deployed behavioral data and platform-specific positioning on YouTube and Instagram to serve differentiated versions of the campaign to different audience profiles. The 1 January release date was also strategic: a moment of existential reflection and resolution-making for a vast number of people simultaneously."
},
{
  label: "Visibility of commercial intent",
  content: "Moderately low. The ad is presented in documentary format, using real emergency calls rather than actors and scripted scenarios. The Apple logo appears only at the end. The campaign won awards precisely because it successfully blurred the line between branded content and authentic human storytelling. The Verge published a piece titled \"Apple's new ad invites you to imagine dying alone without a Watch on your wrist,\" which captures the critical recognition of what the format was doing."
},
{
  label: "Psychological techniques",
  content: "The campaign is a textbook fear-appeal framework: it opens with genuine life-threatening emergencies and resolves them through Apple Watch. The use of real audio recordings rather than acted scenarios makes the fear genuine rather than simulated. The emotional identification is total: the audience is not watching characters, they are hearing real people in real distress. The resolution then positions the Watch as the difference between survival and death, creating a purchase impulse rooted in genuine survival anxiety rather than aspiration."
},
{
  label: "Ideological messaging",
  content: "The ad encodes the ideology that responsible self-care in the 2020s requires continuous biometric connectivity. Not owning an Apple Watch is implicitly framed as a form of negligence rather than a consumer choice. The Watch is presented not as a lifestyle accessory but as a moral obligation, a guardian device that makes you reachable and rescuable regardless of circumstances. This normalises continuous body monitoring as a safety practice rather than a commercial transaction, and makes the data collection that underpins the Watch's functionality feel not just acceptable but necessary."
},
{
  label: "Audience resistance",
  content: "Extremely low. Fear-based appeals to physical survival are among the most counter-argument-resistant mechanisms in advertising. The documentary format bypasses traditional ad skepticism because the audience is not evaluating a sales pitch; they are responding to human beings in distress. The ethical criticism the campaign received, including from mainstream media outlets, suggests that some audiences did recognise the manipulation, but for the target demographic, the emotional pull was designed to be stronger than the analytical response."
}];


const ouraDimensions = [
{
  label: "Targeting methods",
  content: "Health-conscious millennials and professionals interested in wellness optimisation, sleep quality, and biometric self-tracking. Oura reached this audience through digital behavioral targeting and influencer seeding within biohacking, sleep science, and holistic wellness content communities. Unlike Apple Watch, which pursued mass broadcast, Oura targeted a specific self-optimisation subculture whose members were already primed to receive biometric monitoring as a form of self-knowledge rather than surveillance."
},
{
  label: "Visibility of commercial intent",
  content: "Low to moderate. The ad's introspective, documentary-adjacent aesthetic is a deliberate departure from traditional wearable advertising. It does not show athletes or performance metrics. It does not make explicit product claims. It asks a question, \"why do you feel how you feel,\" and positions the ring as the answer. The commercial intent is present but embedded within a format that feels more like a wellness philosophy than a sales pitch."
},
{
  label: "Psychological techniques",
  content: "The campaign operates through curiosity and epistemic anxiety. By suggesting that you do not fully understand your own body without the ring's data, it manufactures a knowledge gap and positions the product as the only way to close it. This is subtler and more sophisticated than fear-based advertising: rather than threatening the audience with emergencies, it suggests that their self-understanding is incomplete. The aspiration being sold is not safety or fitness but self-knowledge, which is a more durable and harder-to-resist appeal."
},
{
  label: "Ideological messaging",
  content: "The campaign encodes the ideology that the body is a system that generates data, and that understanding yourself requires translating that data through technology. This is the quantified self premise made explicit: your feelings, your energy levels, your readiness, your sleep quality are not things you know intuitively. They are things a ring measures and interprets for you. The ideology positions biological self-knowledge as dependent on commercial hardware, making the subscription to Oura's platform a condition for understanding your own experience."
},
{
  label: "Audience resistance",
  content: "Very low for the target demographic. The biohacking and wellness communities that Oura seeded its advertising within were already ideologically aligned with the quantified self premise. For this audience, wearing a continuous biometric monitor is not surveillance but self-care. The campaign's introspective tone makes resistance feel like a rejection of self-understanding rather than skepticism of a commercial product. The monthly subscription model, which requires ongoing payment to access your own health data, is rendered invisible by the intimacy of the framing."
}];


/* ====== COMPONENT ====== */

export default function Sector05Wearables() {
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
            05
          </h2>
          <h3 className="font-display text-2xl md:text-4xl font-bold tracking-wide mb-6" style={{ color: 'white' }}>
            WEARABLES &amp; PERSONAL TECHNOLOGY
          </h3>
          <div className="inline-block px-4 py-2 rounded" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <p className="font-pixel text-[9px] tracking-wider" style={{ color: 'hsl(180, 100%, 85%)' }}>
              ALREEM · ELECTRICAL ENGINEERING
            </p>
          </div>
        </div>
      </section>

      {/* ===== INTRO WINDOW (Mode 1) ===== */}
      <section className="mac-desktop py-16 px-4">
        <div ref={introRef} className="reveal">
          <MacWindow title="sector_05_intro.txt">
            <p className="mb-4">
              Personal technology and wearables advertising refers to the promotion of electronic devices worn on or carried by the body: watches, earbuds, fitness trackers, and smart rings. This sector sits at a unique intersection because the product is not just used by the body but attached to it, which makes the advertising that surrounds it more intimate and more ideologically loaded than almost any other category. It touches on three significant cultural phenomena: the quantified self, in which the body becomes a source of trackable data; surveillance capitalism, in which that personal data becomes a commercial commodity; and the social imperative of constant connectivity, in which being offline has become abnormal rather than default.
            </p>
            <p className="mb-4">
              This sector matters because personal technology advertising has quietly normalised two things that would have seemed extraordinary in the 1980s: the idea that you should continuously monitor your own body, and the idea that your data belongs to the platform keeping track of it. Neither of these premises is announced explicitly in the advertising. Both are embedded in the identity being sold.
            </p>
            <p>
              The evolution from the 1980s to the 2020s traces a fundamental shift in what personal technology promises. In the 1980s, portability meant freedom: the ability to take your music somewhere, to detach from your environment and inhabit your own world. By the 2020s, that freedom had been redefined as connectivity: the ability to remain permanently linked to your health metrics, your notifications, your emergency contacts, and your fitness goals. Devices are no longer standalone objects. They are entry points into ecosystems of continuous data exchange. The identity being sold shifted from the liberated individual who carries their own world to the optimised individual who monitors their own performance.
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

        {/* Ad #1: Sony Walkman */}
        <div ref={ad1Ref} className="reveal-left max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_01_SonyWalkman_1981.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #1
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                Sony Walkman Television &amp; Print Campaign
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Television &amp; Print · 1981 · National Broadcast &amp; Lifestyle Magazines
              </p>
            </div>
            <p className="mb-4">
              A series of television commercials and print advertisements running across the first half of the 1980s in which young, active people are shown jogging, cycling, and moving through urban environments while listening to music on the Sony Walkman. The visual language is consistently aspirational and kinetic: subjects are smiling, physically free, entirely absorbed in their own audio world. One 1981 television spot uses an upbeat jingle and quick cuts of people in motion to establish the central brand proposition: your own music, anywhere, anytime. Print executions in magazines like Esquire show stylish urban adults with the device, reinforcing the lifestyle positioning.
            </p>

            {/* Sony Walkman embed */}
            <div className="embed-container rounded-lg overflow-hidden mb-4 border" style={{ borderColor: '#333' }}>
              <iframe
                src="https://archive.org/embed/walkmandec81"
                width="560"
                height="315"
                allowFullScreen
                loading="lazy"
                title="Sony Walkman 1981 Advertisement"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
              
            </div>

            <AnalysisAccordion dimensions={walkmanDimensions} variant="mac" />
          </MacWindow>
        </div>

        {/* Ad #2: Casio Calculator Watch */}
        <div ref={ad2Ref} className="reveal-right max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_02_CasioWatch_1980.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #2
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                Casio Calculator Watch featuring Bert Parks
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Television Commercial · 1980 · National Broadcast
              </p>
            </div>
            <p className="mb-4">
              A sixty-second television commercial in which <strong>Bert Parks</strong>, the longtime host of the Miss America pageant and a widely recognised American television personality, presents a range of Casio digital watches including the C-80 calculator watch, the Time Scan, and the Melody. Parks demonstrates each watch's features with characteristic showman energy, making the case that Casio's watches do more than tell time: they calculate, they play melodies, they display the date. The ad closes on the value proposition: why carry a separate calculator when your watch already is one?
            </p>

            {/* Casio embed */}
            <div className="embed-container rounded-lg overflow-hidden mb-4 border" style={{ borderColor: '#333' }}>
              <iframe
                src="https://www.youtube.com/embed/7zJDpf3NLaw"
                width="560"
                height="315"
                allowFullScreen
                loading="lazy"
                title="Casio Calculator Watch 1980 Commercial featuring Bert Parks"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
              
            </div>

            <AnalysisAccordion dimensions={casioDimensions} variant="mac" />
          </MacWindow>
        </div>
      </section>

      {/* ===== MAC DIALOG BOX ===== */}
      {!dialogDismissed &&
      <section className="mac-desktop py-8 px-4">
          <div className="max-w-md mx-auto">
            <MacWindow title="System Alert">
              <div className="text-center py-4">
                <p className="font-pixel text-[10px] mb-4" style={{ color: '#333' }}>
                  ⚠ Jump to present day?
                </p>
                <p className="font-mono text-sm mb-6" style={{ color: '#555' }}>
                  Warning: the ads get harder to recognise.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                  onClick={() => setDialogDismissed(true)}
                  className="font-pixel text-[9px] px-4 py-2 border-2 rounded-sm hover:bg-gray-100 transition-colors"
                  style={{ borderColor: '#999', color: '#666' }}>
                  
                    Cancel
                  </button>
                  <button
                  onClick={() => setDialogDismissed(true)}
                  className="font-pixel text-[9px] px-4 py-2 border-2 rounded-sm transition-colors"
                  style={{ background: 'hsl(210, 55%, 50%)', borderColor: 'hsl(215, 65%, 28%)', color: 'white' }}>
                  
                    Continue →
                  </button>
                </div>
              </div>
            </MacWindow>
          </div>
        </section>
      }

      {/* ===== ERA TRANSITION BAR ===== */}
      <section className="py-20 px-4" style={{ background: '#000' }}>
        <div ref={transitionRef} className="reveal-stagger max-w-4xl mx-auto text-center">
          <p className="font-pixel text-[10px] tracking-[0.3em] mb-2 glitch-text" style={{ color: 'hsl(145, 80%, 50%)' }}>
            SYNCING TO CLOUD... YOUR DATA IS NOW THEIRS
          </p>
          <div className="w-48 h-[2px] mx-auto my-8" style={{ background: 'linear-gradient(90deg, hsl(145, 80%, 50%), hsl(330, 90%, 55%))' }} />
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="px-5 py-3 rounded" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="font-pixel text-[8px] tracking-wider mb-1" style={{ color: '#888' }}>1980s</p>
              <p className="font-display text-lg font-bold" style={{ color: 'white' }}>Portability = Freedom</p>
            </div>
            <span className="font-pixel text-[10px]" style={{ color: 'hsl(145, 80%, 50%)' }}>→</span>
            <div className="px-5 py-3 rounded" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="font-pixel text-[8px] tracking-wider mb-1" style={{ color: '#888' }}>2020s</p>
              <p className="font-display text-lg font-bold" style={{ color: 'white' }}>Connectivity = Necessity</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2020s ADS (Mode 2) ===== */}
      <section className="py-20 px-4" style={{
        background: 'linear-gradient(135deg, hsl(270, 60%, 12%) 0%, hsl(270, 50%, 18%) 50%, hsl(300, 40%, 15%) 100%)'
      }}>
        <div className="max-w-4xl mx-auto mb-10">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-3" style={{ color: 'white' }}>
            2020s Advertisements
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] text-center mb-10" style={{ color: 'hsl(270, 70%, 70%)' }}>
            ALGORITHMIC ERA
          </p>
        </div>

        {/* Ad #3: Apple Watch "911" */}
        <div ref={ad3Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="apple"
            verified
            caption="A sixty-second television and digital commercial released on 1 January 2022 in which Apple plays back audio from three real 911 emergency calls made through Apple Watch Series 7. The first caller is a woman whose car has flipped and is filling with water up to her neck. The second is a paddleboarder blown out to sea by strong wind. The third is an elderly farmer who has fallen from a ladder and broken his leg. None of the callers could reach their iPhone. All three reached emergency services through the Watch. The ad closes with the text: &quot;With the help of their watch, Jason, Jim and Amanda were rescued in minutes.&quot; The Watch itself is never shown. The campaign included four separate spots and won a D&AD award in 2022."
            dimensions={appleWatchDimensions}>
            
            <div className="embed-container">
              <iframe
                src="https://www.youtube.com/embed/-Fda_frQH_4"
                width="560"
                height="315"
                allowFullScreen
                loading="lazy"
                title="Apple Watch Series 7 '911' Campaign"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
              
            </div>
          </InstagramCard>
        </div>

        {/* Ad #4: Oura Ring */}
        <div ref={ad4Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="ouraring"
            verified
            caption="A sixty-second brand spot structured as a series of three vignettes, each built around a nursery rhyme call-and-response format. In the first, a woman wakes to her 5:30am alarm with a poor sleep score; the alarm itself tells her she is tired and she knows it, so she can skip the gym. In the second, a man under stress at a library is prompted by a fellow patron voicing his ring: he is anxious and due for a break. In the third, a woman cycles past a stalled car in peak condition; the impressed onlookers recite her biometric data in harmony: &quot;If your heart rate variability is 50 and your body temperature is normal, if your breathing rate is optimal and you know it: bring it on.&quot; The ad presents the ring's data not as surveillance but as a trusted companion that speaks on the wearer's behalf."
            dimensions={ouraDimensions}>
            
            <div className="embed-container">
              <iframe
                src="https://www.ispot.tv/share/Onwe"
                width="560"
                height="315"
                allowFullScreen
                loading="lazy"
                title="Oura Ring 'Know Why You Feel How You Feel' Campaign"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
              
            </div>
          </InstagramCard>
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
              <div className="space-y-4 font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                <p>
                  The most fundamental shift is in what personal technology promises to do. The <strong>Sony Walkman</strong> and <strong>Casio calculator watch</strong> both promised to extend the individual outward: carry your music further, calculate faster, function more efficiently in the world. By the 2020s, <strong>Apple Watch</strong> and <strong>Oura Ring</strong> had inverted this direction entirely. The device no longer extends your capabilities into the world. It turns your attention inward, toward your own biological systems.
                </p>
                <p>
                  Delivery methods changed with equal significance. The Sony and Casio campaigns operated through mass broadcast and print. By the 2020s, Apple and Oura used behavioral data to construct individual profiles and serve personalised content through algorithmic feeds. The Oura campaign specifically embedded advertising within biohacking and wellness influencer communities.
                </p>
                <p>
                  The relationship between the device and privacy reversed completely. In 1980, the Sony Walkman explicitly gave you privacy from your environment. By 2022, the Apple Watch continuously shares your data with Apple's servers, emergency services, and potentially insurers and advertisers. The Oura Ring requires a monthly subscription to access your own biometric history.
                </p>
                <p>
                  Use patterns shifted from occasional to permanent. The Walkman was something you took out for a run or a commute. The Apple Watch and Oura Ring are designed to be worn continuously, including during sleep. Advertising normalised this permanence by framing it as dedication to health rather than submission to surveillance.
                </p>
              </div>
            </div>

            {/* What Stayed the Same */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 className="font-display text-xl font-bold mb-4" style={{ color: 'hsl(38, 95%, 60%)' }}>
                What Stayed the Same
              </h4>
              <div className="space-y-4 font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                <p>
                  The foundational advertising logic has not changed. Every ad in both eras identifies a gap between the user's current experience and a better version of it, and positions a purchase as the bridge. The Sony Walkman gap was between music being stationary and music being portable. The Apple Watch gap is between being potentially unreachable in an emergency and being permanently connected and rescuable. The Oura Ring gap is between not fully understanding your own body and having complete biometric self-knowledge.
                </p>
                <p>
                  Both eras also link the device directly to identity and status. The Walkman user was the modern, culturally autonomous individual. The Casio calculator watch owner was the forward-thinking professional. The Apple Watch owner is the responsible adult who has taken steps to protect themselves and their family. The Oura Ring wearer is the self-aware, data-literate person who understands their own body at a biochemical level.
                </p>
                <p>
                  The imperative to upgrade has also remained constant across both eras. The Casio campaign implicitly positioned its watch as the current frontier of personal technology, which would inevitably be superseded. The Apple Watch releases a new Series every year. The Oura Ring moved from generation to generation with each iteration presented as meaningfully superior to its predecessor. Advertising in both eras created the sense that your current device was approaching obsolescence, and that staying current was a form of self-investment rather than commercial manipulation.
                </p>
              </div>
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
            ELECTRICAL ENGINEERING LENS
          </p>
          <div className="sector-perspective">
            <h4 className="font-display text-xl md:text-2xl font-bold mb-4" style={{ color: 'white' }}>
              From Portability as Freedom to Connectivity as Necessity
            </h4>
            <ul className="list-disc pl-5 space-y-4 font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              <li>
                The shift from entertainment to optimisation and monitoring in personal technology advertising represents more than a change in product category. It represents a structural transformation in the relationship between the human body and commercial infrastructure.
              </li>
              <li>
                The Sony Walkman was a closed system. It played your tape. It did not record your behavior, transmit your location, or adjust its function based on usage patterns. The advertising it generated could only appeal to your aspirations because it had no access to your behaviors. The Apple Watch and Oura Ring are open systems in continuous data exchange with corporate servers. The advertising they generate is informed by everything those devices have already collected from you and from millions of users before you. This is not a technological upgrade. It is a categorical shift in what the product relationship means.
              </li>
              <li>
                The quantified self movement, which Oura's advertising explicitly articulates and Apple Watch's implicitly normalises, reveals something specific about this transformation. By framing continuous biometric monitoring as self-knowledge rather than data collection, wearable advertising successfully relocated surveillance from the category of things done to you into the category of things you do for yourself. The Oura Ring does not collect your sleep data for commercial purposes. It helps you understand why you feel how you feel. The commercial arrangement in which that self-knowledge is generated is rendered invisible by the intimacy of the framing.
              </li>
              <li>
                The normalisation of constant connectivity through wearable advertising carries real consequences that the advertising itself never addresses. The data generated by wearables is among the most sensitive personal information that exists: it documents health conditions, activity patterns, location history, sleep disruption, and physiological stress responses in granular detail. Insurance companies have shown documented interest in wearable data for risk assessment. The advertising that sells these devices presents them as tools for personal empowerment. The infrastructure that runs them is a commercial data operation of unprecedented physical intimacy.
              </li>
              <li>
                The transformation from portability as freedom to connectivity as necessity is not simply a shift in product features. It is a shift in the ideology of what technology is for. The Sony Walkman freed you from your environment by giving you your own private world within it. The Apple Watch makes you permanently available to your environment: to emergency services, to health platforms, to the corporate infrastructure that processes your biometric data as a commercial asset. Both eras of advertising presented this as liberation. The Walkman gave you freedom from the world. The Apple Watch gives you freedom from worry about the world, in exchange for your continuous presence within a monitored ecosystem. The freedom is real in both cases. What changed is what you give up for it.
              </li>
            </ul>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(236, 72, 153, 0.2)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
              <span className="text-xs" style={{ color: 'hsl(330, 90%, 65%)' }}>A</span>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>Alreem</p>
              <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Electrical Engineering</p>
            </div>
          </div>
        </div>
      </section>
    </div>);

}