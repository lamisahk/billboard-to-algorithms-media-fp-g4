import BillboardHero from "@/components/essay/BillboardHero";
import IntroSections from "@/components/essay/IntroSections";
import Sector01Wellness from "@/components/essay/Sector01Wellness";

const Index = () => {
  return (
    <main className="min-h-screen" style={{ background: '#000' }}>
      <BillboardHero />
      <IntroSections />
      <Sector01Wellness />
    </main>
  );
};

export default Index;
