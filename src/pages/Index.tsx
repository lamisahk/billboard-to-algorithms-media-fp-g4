import BillboardHero from "@/components/essay/BillboardHero";
import IntroSections from "@/components/essay/IntroSections";
import Sector01Wellness from "@/components/essay/Sector01Wellness";
import Sector02Business from "@/components/essay/Sector02Business";
import Sector03Investment from "@/components/essay/Sector03Investment";
import Sector04Software from "@/components/essay/Sector04Software";
import Sector05Wearables from "@/components/essay/Sector05Wearables";
import DataVizChart from "@/components/essay/DataVizChart";
import StickyTimeline from "@/components/essay/StickyTimeline";
import SpotTheAdQuiz from "@/components/essay/SpotTheAdQuiz";
import ComparativeAnalysis from "@/components/essay/ComparativeAnalysis";
import ScrollProgressBar from "@/components/essay/ScrollProgressBar";
import ChapterNav from "@/components/essay/ChapterNav";
import BackToTop from "@/components/essay/BackToTop";
import TopNav from "@/components/essay/TopNav";

// Visual essay page
const Index = () => {
  return (
    <main className="min-h-screen" style={{ background: '#000' }}>
      <ScrollProgressBar />
      <TopNav />
      <ChapterNav />
      <div id="hero"><BillboardHero /></div>
      <IntroSections />
      <div id="data-viz"><DataVizChart /></div>
      <div id="sector-01"><Sector01Wellness /></div>
      <div id="sector-02"><Sector02Business /></div>
      <div id="sector-03"><Sector03Investment /></div>
      <div id="sector-04"><Sector04Software /></div>
      <div id="sector-05"><Sector05Wearables /></div>
      <div id="timeline"><StickyTimeline /></div>
      <div id="quiz"><SpotTheAdQuiz /></div>
      <ComparativeAnalysis />
      <BackToTop />
    </main>
  );
};

export default Index;
