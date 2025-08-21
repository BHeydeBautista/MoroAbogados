import HeroCarousel from "@/components/hero/HeroCarousel";
import InstagramFeed from "@/components/InstagramFeed";
import LawyersShowcaseEnhanced from "@/components/LawyersShowcaseEnhanced";
import PracticeAreas from "@/components/PracticeAreas";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <Profile />
      <PracticeAreas />
      <InstagramFeed />
      <LawyersShowcaseEnhanced />
    </main>
  );
}
