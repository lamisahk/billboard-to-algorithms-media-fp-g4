import BillboardHero from "@/components/essay/BillboardHero";
import IntroSections from "@/components/essay/IntroSections";
import Sector01Wellness from "@/components/essay/Sector01Wellness";
import Sector02Business from "@/components/essay/Sector02Business";

const Index = () => {
  return (
    <main className="min-h-screen" style={{ background: '#000' }}>
      <BillboardHero />
      <IntroSections />
      <Sector01Wellness />
      <Sector02Business />
    </main>
  );
};

export default Index;
