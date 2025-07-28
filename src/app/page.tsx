import HeroCarousel from "@/components/hero/HeroCarousel";
import InstagramFeed from "@/components/InstagramFeed";
import PracticeAreas from "@/components/PracticeAreas";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <WhyUs />
      <PracticeAreas />
      <InstagramFeed />
    </main>
  );
}
