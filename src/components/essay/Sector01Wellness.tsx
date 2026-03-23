import MacWindow from "./MacWindow";
import AnalysisAccordion from "./AnalysisAccordion";
import InstagramCard from "./InstagramCard";
import { useState } from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import dexatrimAd from "@/assets/dexatrim-ad.png";

/* ====== AD DATA ====== */

const specialKDimensions = [
  {
    label: "Targeting methods",
    content: "Married couples and weight-conscious adults, reached through daytime and primetime broadcast television. The domestic setting and domestic couple frame a mainstream household audience. Both partners are implicated, which broadens the demographic appeal beyond the female-only diet advertising typical of the era."
  },
  {
    label: "Visibility of commercial intent",
    content: "Very high. Clearly a product commercial. Brand name present throughout, product shown with nutritional information, and an explicit diet claim made in the voiceover. No ambiguity about what is being sold."
  },
  {
    label: "Psychological techniques",
    content: "The garden setting is doing significant work here. By placing the pinch test inside a loving, comfortable domestic relationship, the ad normalizes body surveillance as something couples do to each other affectionately. The shock reactions from both partners are played for humor rather than shame, which lowers the audience's defenses. The technique manufactures a problem, which is ordinary body fat, in a register that feels playful rather than threatening. The product then arrives as the natural resolution of the mild anxiety that was just created."
  },
  {
    label: "Ideological messaging",
    content: "The ad encodes two ideological claims simultaneously. First, that normal body fat is a measurable problem requiring dietary correction. Second, that partners have a legitimate and even affectionate role in monitoring each other's bodies. The wife brings tea and receives a body assessment. The husband reads the paper and receives the same. The symmetry makes it seem fair, but the domestic scene in which this occurs, with its clear gender roles, frames body management as part of the couple's shared project of self-improvement. Health, attractiveness, and marital harmony are quietly bundled together."
  },
  {
    label: "Audience resistance",
    content: "Moderate. The commercial intent is obvious, and audiences of the era were practiced at recognizing and dismissing broadcast advertising. However, the humor and warmth of the garden setting lower the emotional defenses that more overtly shame-based advertising would trigger. An audience member who laughs at the shocked expressions has already emotionally accepted the premise that the pinch test is a reasonable thing to do."
  },
];

const dexatrimDimensions = [
  {
    label: "Targeting methods",
    content: "Magazine placement in publications read by women aged 25 to 50. The over-the-counter pharmacy positioning extended the reach beyond advertising into the physical retail environment, where drugstore placement alongside legitimate medications reinforced the clinical framing."
  },
  {
    label: "Visibility of commercial intent",
    content: "High. Clearly formatted as a paid advertisement, distinct from editorial content. However, the pharmaceutical aesthetic, clinical copy, and pharmacy distribution created a layer of institutional authority that complicated straightforward dismissal."
  },
  {
    label: "Psychological techniques",
    content: "Dexatrim used medicalization as its primary mechanism. By presenting weight loss as a pharmacological problem with a pharmacological solution, it positioned ordinary body weight as a clinical condition. The pill format borrowed legitimacy from genuine medicine. The before-and-after testimonials provided social proof. Together, these created the impression that not using the product was a failure of self-care rather than simply a lifestyle choice."
  },
  {
    label: "Ideological messaging",
    content: "The ad encoded the ideology that the normal female body is a medical management problem. By selling a pill through a pharmacy, Dexatrim positioned weight not as an aesthetic concern but as something requiring pharmaceutical intervention. This is an early and direct example of the medicalization argument this sector traces: a drug company redefining normal weight variation as a condition requiring treatment, decades before \"wellness\" became the dominant commercial vocabulary."
  },
  {
    label: "Audience resistance",
    content: "Moderate to low. The pharmaceutical framing raised the psychological stakes of resistance. Dismissing a billboard is easy. Dismissing something positioned as medicine requires the audience to override an authority structure consciously. The drugstore context removed the product from the advertising environment entirely, embedding it in a space associated with healthcare."
  },
];

const ozempicDimensions = [
  {
    label: "Targeting methods",
    content: "The original campaign targeted adults aged 45 to 65 with Type 2 diabetes diagnoses, using the 1970s song to reach a demographic that would have grown up with it. However, the advertising's actual reach extended dramatically beyond its clinical target as social media amplification, celebrity use disclosures, and cultural commentary made Ozempic a household name for weight loss among people with no diabetes diagnosis. The ad created demand it was not technically addressed to."
  },
  {
    label: "Visibility of commercial intent",
    content: "High, low for the intent. The commercial format is clearly identifiable as a pharmaceutical advertisement. However, the specific mechanism by which it generated its most significant cultural effect was entirely invisible: the ad never explicitly promoted Ozempic for weight loss. It mentioned weight loss data almost in passing. The cultural conversation around the drug did the weight loss marketing for Novo Nordisk, organically and for free, through celebrity gossip, social media, and news coverage that the advertising spend had seeded."
  },
  {
    label: "Psychological techniques",
    content: "The jingle is the primary mechanism and it is a masterclass in memory engineering. An earworm attached to a brand name means that the product enters involuntary recall. Consumers who had never seen the ad found themselves humming it. People who were not diabetic found themselves asking their doctors about it. The joyful lifestyle imagery positioned the drug not as a medical intervention for a difficult disease but as a product that restored the energy and joy of everyday life. The aspiration is not managing blood sugar. It is being the person playing pickleball with that kind of ease."
  },
  {
    label: "Ideological messaging",
    content: "The Ozempic campaign encodes the ideology that pharmaceutical intervention is a natural and desirable route to a fuller life, not a last resort for a medical condition. By aestheticizing the experience of taking a prescription medication through joyful lifestyle imagery and a pop song, it repositioned pharmaceuticals as consumer wellness products. This is medicalization operating in reverse: not telling people their bodies are broken, but telling people that a better body is available, and that a prescription is a reasonable way to access it."
  },
  {
    label: "Audience resistance",
    content: "Very low, and for a reason unique to this campaign. The ad's most powerful effect operated entirely outside the advertising itself, through organic cultural conversation. A person who was never exposed to the Ozempic commercial still encountered the drug through news articles, celebrity interviews, social media, and conversations with friends. By the time someone asked their doctor about it, they were not responding to an ad. They were responding to a cultural moment that advertising had manufactured but that no longer looked like advertising at all."
  },
];

const noomDimensions = [
  {
    label: "Targeting methods",
    content: "A multi-platform campaign running across Facebook, Instagram, YouTube, and streaming platforms, supplemented by heavy affiliate influencer marketing and testimonial-based social media content. Critically, Noom's sign-up process itself collects detailed psychological and health data, which feeds back into advertising refinement."
  },
  {
    label: "Visibility of commercial intent",
    content: "Low to medium. The \"New Recruits\" ads are clearly labeled as paid promotions on social platforms, but the testimonial format and relatable, non-threatening visual language soften the commercial register significantly. Affiliate influencer content operating alongside the official campaign is considerably less visible, often disclosed only with small hashtags that research consistently shows audiences fail to register."
  },
  {
    label: "Psychological techniques",
    content: "Noom's central innovation is repositioning weight loss from discipline to psychology. By framing the product as addressing your relationship with food rather than your body size, it sidesteps the shame-based mechanics of 1980s diet advertising and replaces them with something that feels more progressive and empowering. The intake questionnaire collects personal data while simultaneously generating a sense of individualized care. The app's community features create social investment that makes discontinuation feel like abandoning a support network rather than canceling a subscription."
  },
  {
    label: "Ideological messaging",
    content: "Noom encodes the ideology that your relationship with food is a psychological system that can be corrected and optimized. In doing so, it extends medicalization from the body into the mind, treating emotional eating, food associations, and habitual behaviors as conditions requiring structured intervention. The person who eats intuitively, without a coaching app, is implicitly falling short of a managed, optimized standard. This is medicalization at the level of consciousness rather than the body."
  },
  {
    label: "Audience resistance",
    content: "Extremely difficult. The psychological reframing makes resistance feel like a rejection of self-understanding rather than skepticism of a commercial product. The freemium onboarding collects personal data before any payment is required, creating investment before commitment. The community model means that leaving the app feels socially costly. Once a user has disclosed personal eating history, emotional triggers, and health goals to the platform, that data remains with the company regardless of subscription status."
  },
];

const himsDimensions = [
  {
    label: "Targeting methods",
    content: "Super Bowl placement delivered mass reach (127 million viewers) in a single broadcast, a 1980s-scale targeting mechanism applied to a 2020s brand. This was deliberate: Hims and Hers had built its subscriber base through hyper-targeted digital advertising and used the Super Bowl to extend brand awareness to demographics outside its algorithmic reach. The ad was then amplified through social media and digital channels, where behavioral targeting took over."
  },
  {
    label: "Visibility of commercial intent",
    content: "Medium. The Super Bowl context makes the commercial format obvious. However, the ad's rhetorical strategy, presenting a telehealth company as a political actor fighting systemic injustice, substantially complicates the commercial framing. Viewers are invited to identify with a critique of the healthcare industry rather than evaluate a product purchase. The distinction between advocacy and advertising is actively blurred."
  },
  {
    label: "Psychological techniques",
    content: "The ad uses righteous anger as its primary emotional mechanism. It identifies a real and widely felt problem, unaffordable healthcare and medication pricing, and positions the brand as its solution. This is grievance marketing: the advertiser first validates the audience's frustration, then presents the product as the appropriate response to that frustration. It is a sophisticated evolution of the manufactured-problem, product-solution structure that Dexatrim used in 1984, applied now to systemic healthcare anxiety rather than personal body dissatisfaction."
  },
  {
    label: "Ideological messaging",
    content: "The ad sells the ideology that access to medical treatment is a consumer right, and that the appropriate response to a failing healthcare system is a better product rather than structural change. In doing so it quietly reframes a political problem as a market problem. It also expands the definition of health as a site of commercial intervention: GLP-1 medications were originally developed for diabetes management and are now being marketed directly to consumers for weight loss through a telehealth platform that was simultaneously found to be transmitting users' health data to Meta and Google without adequate disclosure (The Markup, 2022)."
  },
  {
    label: "Audience resistance",
    content: "Difficult. The political framing of the ad preemptively neutralizes commercial skepticism by aligning the brand with the audience's own frustration. Criticizing the ad feels like defending the pharmaceutical industry. The data privacy dimension of Hims and Hers' broader operation is entirely invisible to the audience engaging with the Super Bowl spot."
  },
];

/* ====== COMPONENT ====== */

export default function Sector01Wellness() {
  const [dialogDismissed, setDialogDismissed] = useState(false);

  const headerRef = useScrollReveal<HTMLDivElement>(0.2);
  const introRef = useScrollReveal<HTMLDivElement>();
  const ad1Ref = useScrollReveal<HTMLDivElement>();
  const ad2Ref = useScrollReveal<HTMLDivElement>();
  const transitionRef = useStaggerReveal<HTMLDivElement>();
  const ad3Ref = useScrollReveal<HTMLDivElement>();
  const ad4Ref = useScrollReveal<HTMLDivElement>();
  const ad5Ref = useScrollReveal<HTMLDivElement>();
  const summaryRef = useStaggerReveal<HTMLDivElement>();
  const perspectiveRef = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      {/* ===== SECTOR HEADER (Mode 1) ===== */}
      <section className="mac-desktop py-24 px-4">
        <div ref={headerRef} className="reveal-blur max-w-4xl mx-auto text-center">
          <p className="font-pixel text-[10px] tracking-[0.3em] mb-4" style={{ color: 'hsl(180, 100%, 80%)' }}>
            SECTOR
          </p>
          <h2 className="font-display text-7xl md:text-9xl font-extrabold mb-4" style={{ color: 'white', textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
            01
          </h2>
          <h3 className="font-display text-2xl md:text-4xl font-bold tracking-wide mb-6" style={{ color: 'white' }}>
            HEALTHCARE &amp; WELLNESS
          </h3>
          <div className="inline-block px-4 py-2 rounded" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <p className="font-pixel text-[9px] tracking-wider" style={{ color: 'hsl(180, 100%, 85%)' }}>
              LAMISAH · BIOMEDICAL SCIENCE
            </p>
          </div>
        </div>
      </section>

      {/* ===== INTRO WINDOW (Mode 1) ===== */}
      <section className="mac-desktop py-16 px-4">
        <div ref={introRef} className="reveal">
          <MacWindow title="sector_01_intro.txt">
            <p className="mb-4">
              Wellness advertising occupies a uniquely intimate territory in the broader advertising landscape. Unlike ads for software or financial products, wellness advertising targets the body itself, making it the most powerful sector for identity construction this project examines. The body is where personal insecurity lives most immediately, and wellness advertising has always known this. From the 1980s to the present, it has operated by taking ordinary biological experiences, reframing them as deficiencies, and attaching purchasable solutions to them.
            </p>
            <p className="mb-4">
              What makes this sector particularly significant from a biomedical perspective is the question of what counts as a medical problem in the first place. The definition has not stayed still. In the 1980s, wellness advertising primarily medicalized body size: excess weight was framed as both an aesthetic failure and a health risk, and the solution was a product. By the 2020s, that medicalization had expanded dramatically. Gut bacteria, cortisol levels, inflammation, sleep cycles, hormones, and emotional relationships with food had all become targets of commercial health intervention. Normal biological variation became, in the language of modern wellness advertising, a set of systems requiring optimization.
            </p>
            <p>
              This shift from fixing visible problems to optimizing invisible processes is the central transformation this sector documents. Between the 1980s and 2020s, the scope of what wellness advertising claimed authority over grew from the scale to the cell, and the commercial infrastructure for delivering those claims moved from the television screen to the algorithmic feed.
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

        {/* Ad #1: Special K */}
        <div ref={ad1Ref} className="reveal-left max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_01_SpecialK_1985.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #1
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                Kellogg's Special K "Pinch an Inch"
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Television Commercial · 1985 · National Broadcast
              </p>
            </div>
            <p className="mb-4">
              A thirty-second spot set in a suburban garden. A wife brings her husband tea while he reads the paper. He reaches over and pinches her waist. She reacts with mock alarm. She then pinches his. Same reaction. The voiceover delivers the campaign line throughout: "This is the Special K pinch. If you can pinch more than an inch, you may need to watch your weight." The ad closes on the couple cheerfully eating Special K and drinking orange juice, now apparently on track.
            </p>

            {/* Video embed */}
            <div className="embed-container mb-4 rounded overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/SWUBIbsSB2c"
                title="Kellogg's Special K Pinch an Inch 1985"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <AnalysisAccordion dimensions={specialKDimensions} variant="mac" />
          </MacWindow>
        </div>

        {/* Ad #2: Dexatrim (Print ad card) */}
        <div ref={ad2Ref} className="reveal-right max-w-4xl mx-auto mb-12">
          <MacWindow title="Ad_02_Dexatrim_1980.txt">
            <div className="mb-4">
              <span className="font-pixel text-[9px] inline-block px-2 py-1 mb-3 rounded" style={{ background: 'hsl(210, 50%, 88%)', color: 'hsl(215, 70%, 30%)' }}>
                AD #2
              </span>
              <h4 className="font-display text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                Dexatrim "Extra Strength"
              </h4>
              <p className="font-mono text-xs mb-3" style={{ color: '#888' }}>
                Print Advertisement · 1980 · Women's Magazines
              </p>
            </div>
            <p className="mb-4">
              A double-page color spread featuring oversized fingers holding a single capsule against a black background, three named testimonials with specific weight loss figures, and copy referencing seven years of clinical tests and a United States Government medical advisory panel. The headline reads "Dexatrim: the clinically proven way to lose weight." The product is packaged and positioned as pharmaceutical-grade, sold over the counter in drugstores nationwide.
            </p>

            {/* Dexatrim ad image */}
            <div className="rounded-lg overflow-hidden mb-4 border" style={{ borderColor: '#333' }}>
              <img
                src={dexatrimAd}
                alt="Dexatrim 1980 print advertisement - 'The clinically proven way to lose weight' with testimonials and product packaging"
                className="w-full h-auto"
                loading="lazy"
                width={1024}
                height={640}
              />
            </div>

            <AnalysisAccordion dimensions={dexatrimDimensions} variant="mac" />
          </MacWindow>
        </div>
      </section>

      {/* ===== MAC DIALOG BOX ===== */}
      {!dialogDismissed && (
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
                    style={{
                      background: 'hsl(0 0% 90%)',
                      border: '2px outset hsl(0 0% 80%)',
                    }}
                    onClick={() => setDialogDismissed(true)}
                  >
                    Cancel
                  </button>
                  <button
                    className="font-pixel text-[9px] px-4 py-2 rounded-sm"
                    style={{
                      background: 'hsl(210 50% 88%)',
                      border: '2px outset hsl(210 50% 78%)',
                    }}
                    onClick={() => setDialogDismissed(true)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== ERA TRANSITION BAR ===== */}
      <section className="py-20 px-4 relative section-wipe" style={{ background: '#000' }}>
        <div ref={transitionRef} className="reveal-stagger max-w-3xl mx-auto text-center">
          <p className="font-mono text-sm glitch-text mb-8" style={{ color: 'hsl(145, 80%, 50%)' }}>
            FAST FORWARDING... 1985 TO 2022
          </p>
          <div className="flex items-center justify-center gap-8">
            <div className="px-4 py-2 rounded-full" style={{ border: '1px solid hsl(180, 100%, 30%)', color: 'hsl(180, 100%, 70%)' }}>
              <span className="font-pixel text-[9px] tracking-wider">Body = Problem</span>
            </div>
            <div className="font-mono text-lg" style={{ color: '#555' }}>→</div>
            <div className="px-4 py-2 rounded-full" style={{ border: '1px solid hsl(270, 50%, 50%)', color: 'hsl(270, 50%, 75%)' }}>
              <span className="font-pixel text-[9px] tracking-wider">Everything = Problem</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2020s ADS (Mode 2) ===== */}
      <section
        className="py-16 px-4"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, hsl(270, 60%, 18%), transparent 60%), radial-gradient(ellipse at 80% 50%, hsl(330, 50%, 20%), transparent 60%), hsl(270, 60%, 8%)',
        }}
      >
        <div className="max-w-4xl mx-auto mb-8">
          <p className="font-pixel text-[10px] tracking-[0.3em] text-center mb-8" style={{ color: 'hsl(330, 90%, 65%)' }}>
            2020s ADVERTISEMENTS
          </p>
        </div>

        {/* Ad #3: Ozempic */}
        <div ref={ad3Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="ozempic"
            sponsored
            verified
            caption="A ninety-second television commercial launched in 2018 and running continuously through 2023, set to a modified version of the 1974 pop song &quot;Magic&quot; by Pilot. The original chorus &quot;Oh oh oh it's magic&quot; is replaced with &quot;Oh oh oh Ozempic.&quot; The ad shows middle-aged people cooking, repairing bikes, and playing pickleball, performing ordinary activities with visible energy and joy. On-screen text highlights that patients in a clinical study lost up to 12 pounds. The ad is for a Type 2 diabetes medication. It does not mention weight loss as its primary purpose. It does not need to."
            dimensions={ozempicDimensions}
          >
            <div className="embed-container">
              <iframe
                src="https://www.youtube.com/embed/bzIBj90D3YA"
                title="Ozempic Oh Oh Oh"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </InstagramCard>
          <div className="max-w-2xl mx-auto mt-2">
            <p className="font-mono text-xs text-center" style={{ color: 'hsl(0, 0%, 50%)' }}>
              2018 to 2023 · Television, Digital, Radio, Billboards, Print
            </p>
          </div>
        </div>

        {/* Ad #4: Noom */}
        <div ref={ad4Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="noom"
            sponsored
            verified
            caption="A multi-platform campaign launched in late 2023 featuring comic-style video ads in which different &quot;types&quot; of people, exercise avoiders, vegans, people managing high cholesterol, and midlife weight gain, discover that Noom adapts to their specific psychology and lifestyle. The campaign ran across Facebook, Instagram, YouTube, and streaming platforms, supplemented by heavy affiliate influencer marketing and testimonial-based social media content."
            dimensions={noomDimensions}
          >
            <div className="embed-container">
              <iframe
                src="https://player.vimeo.com/video/1079913906"
                title="Noom New Recruits"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </InstagramCard>
          <div className="max-w-2xl mx-auto mt-2">
            <p className="font-mono text-xs text-center" style={{ color: 'hsl(0, 0%, 50%)' }}>
              2021 to 2024 · Facebook, Instagram, YouTube, Streaming, Television
            </p>
          </div>
        </div>

        {/* Ad #5: Hims & Hers */}
        <div ref={ad5Ref} className="reveal-scale mb-16">
          <InstagramCard
            username="himshers"
            sponsored
            verified
            caption="A sixty-second Super Bowl LIX commercial (February 2025) in which Hims and Hers positions itself as a direct challenger to the traditional healthcare and pharmaceutical industry. The ad criticizes the high cost of branded weight-loss medications. Hims and Hers' compounded GLP-1 alternatives are presented as accessible and affordable, framing the brand as a patient advocate operating against a broken system. It reached an estimated 127 million viewers."
            dimensions={himsDimensions}
          >
            <div className="embed-container">
              <iframe
                src="https://www.youtube.com/embed/iOXWmZbA2Io"
                title="Hims and Hers Sick of the System"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </InstagramCard>
          <div className="max-w-2xl mx-auto mt-2">
            <p className="font-mono text-xs text-center" style={{ color: 'hsl(0, 0%, 50%)' }}>
              2025 · Super Bowl LIX Broadcast, YouTube, Social Media, Streaming
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMPARATIVE SUMMARY (Mode 2) ===== */}
      <section
        className="py-16 px-4"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, hsl(270, 50%, 15%), transparent 60%), hsl(270, 60%, 8%)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-3xl md:text-5xl font-bold text-center mb-3" style={{ color: 'white' }}>
            Comparative Summary
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] text-center mb-10" style={{ color: 'hsl(330, 90%, 65%)' }}>
            COMPARATIVE SUMMARY
          </p>

          <div ref={summaryRef} className="reveal-stagger grid md:grid-cols-2 gap-8 mb-12">
            {/* What Changed */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 className="font-display text-xl font-bold mb-4" style={{ color: 'hsl(145, 80%, 60%)' }}>
                What Changed
              </h4>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                The most fundamental change is the expansion of what counts as a health problem in the first place. In the 1980s, wellness advertising targeted what was visible and measurable. The Special K pinch test worked because body fat was something you could literally hold in your fingers. Dexatrim worked because weight was a number on a scale. The problem and the solution were both concrete and external.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                By the 2020s, the category of commercial health concern had moved inward to systems the consumer could not see or directly evaluate. Ozempic advertised a diabetes medication into a weight loss cultural phenomenon by never explicitly advertising it as one. Noom medicalized the psychology of eating rather than the body itself. Hims and Hers medicalized access to healthcare, arguing that the gap between you and optimal health was a market problem with a subscription solution. The body was no longer the only site of commercial intervention. The mind, the bloodstream, and the healthcare system itself had all become wellness territories.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Delivery changed just as dramatically. The 1980s operated through broadcast infrastructure: television slots, magazine pages, drugstore shelves. Every format announced itself. The commercial break, the ad page, and the pharmacy packaging were all clearly demarcated from the content around them. The 2020s dissolved those boundaries entirely. The Ozempic jingle entered involuntary recall without requiring the viewer to watch the ad. Noom's intake questionnaire was experienced as personalised care rather than data collection. The Hims and Hers Super Bowl spot was experienced as political commentary rather than product promotion. Targeting shifted from demographic inference to individual behavioral profiling, meaning the ad that reaches you in 2024 was built specifically around your search history, your engagement patterns, and your algorithmically modelled psychology.
              </p>
            </div>

            {/* What Stayed the Same */}
            <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 className="font-display text-xl font-bold mb-4" style={{ color: 'hsl(38, 95%, 60%)' }}>
                What Stayed the Same
              </h4>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                The foundational structure did not change at all. Every ad across both eras follows the same sequence: identify a gap between the consumer's current state and an acceptable or optimal state, generate dissatisfaction about that gap, and supply a purchase as the resolution. Special K manufactured body anxiety and sold cereal. Ozempic manufactured aspiration for a more energetic life and sold a prescription drug. The vocabulary changed from shame to empowerment, from discipline to optimization, but the logic is identical.
              </p>
              <p className="font-mono text-sm leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Both eras also share the equation of commercial consumption with personal virtue and identity. The 1980s consumer who managed her weight through Special K was disciplined and in control. The 2020s consumer who tracks her food psychology through Noom, accesses GLP-1 medications through a telehealth app, or aligns herself with a brand that fights the healthcare system is proactive, informed, and invested in her health. In both cases the purchase is not just a transaction. It is a statement about what kind of person you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTOR PERSPECTIVE (Mode 2) ===== */}
      <section
        className="py-16 px-4"
        style={{
          background: 'radial-gradient(ellipse at 70% 70%, hsl(330, 50%, 15%), transparent 60%), hsl(270, 60%, 8%)',
        }}
      >
        <div ref={perspectiveRef} className="reveal max-w-3xl mx-auto">
          <h3 className="font-display text-3xl md:text-5xl font-bold mb-3" style={{ color: 'white' }}>
            Sector Perspective
          </h3>
          <p className="font-pixel text-[10px] tracking-[0.3em] mb-8" style={{ color: 'hsl(330, 90%, 65%)' }}>
            BIOMEDICAL LENS
          </p>
          <div className="sector-perspective">
            <h4 className="font-display text-lg font-bold mb-4" style={{ color: 'white' }}>
              Medicalization, Commodification, and the Expanding Definition of Health
            </h4>
            <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Wellness advertising across both eras has systematically medicalized normal biological experience, but the scale and method of that medicalization shifted fundamentally between the 1980s and 2020s.
            </p>
            <ul className="list-disc pl-5 space-y-4 font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              <li>
                In the 1980s, the medicalization was blunt. Body weight outside a commercially defined norm was treated as a correctable pathology. Dexatrim made this explicit through pharmaceutical framing, borrowing the authority of clinical medicine to sell an appetite suppressant that would later be withdrawn from the market after being linked to hemorrhagic stroke. Special K made it implicit through the language of the body check. The message was simple: your body has a measurable deficiency, and this product corrects it.
              </li>
              <li>
                By the 2020s, medicalization had become a comprehensive framework applied to virtually every dimension of biological and psychological experience. Ozempic, originally developed and approved for Type 2 diabetes management, was transformed by its advertising and the cultural conversation it seeded into a general wellness product, available to anyone who could access a prescription and willing to define their body as insufficiently optimized. Noom medicalized the psychology of eating, treating intuitive food choices as a system requiring professional behavioral intervention. Hims and Hers medicalized healthcare access itself.
              </li>
              <li>
                From a biomedical standpoint, this expansion is significant for a specific reason. The conditions being commercially addressed by 2020s wellness advertising exist on a spectrum between genuine clinical need and commercially manufactured concern. Ozempic has real clinical value for diabetic patients. Its cultural reframing as a general weight optimization tool for non-diabetic consumers is something else entirely, and the advertising infrastructure that enabled that reframing operated largely outside the regulatory standards that govern clinical claims. Hims and Hers was found to be transmitting patient health data to Meta and Google while presenting itself as a patient advocate fighting the healthcare system. The medicalization of everyday life that both eras of wellness advertising document carries real costs when the medical framing is commercially constructed rather than clinically grounded, and those costs fall on the consumers who trusted the framing most.
              </li>
            </ul>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(236, 72, 153, 0.2)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
              <span className="font-pixel text-[8px]" style={{ color: 'hsl(330, 90%, 65%)' }}>L</span>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold" style={{ color: 'white' }}>Lamisah</p>
              <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Biomedical Science</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
