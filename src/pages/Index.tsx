import BillboardHero from "@/components/essay/BillboardHero";
import IntroSections from "@/components/essay/IntroSections";
import Sector01Wellness from "@/components/essay/Sector01Wellness";
import Sector02Business from "@/components/essay/Sector02Business";
import Sector03Investment from "@/components/essay/Sector03Investment";
import Sector04Software from "@/components/essay/Sector04Software";

// Visual essay page
const Index = () => {
  return (
    <main className="min-h-screen" style={{ background: '#000' }}>
      <BillboardHero />
      <IntroSections />
      <Sector01Wellness />
      <Sector02Business />
      <Sector03Investment />
      <Sector04Software />
    </main>
  );
};

export default Index;
