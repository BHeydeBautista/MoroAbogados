import HeroCarousel from "@/components/hero/HeroCarousel";
import InstagramFeed from "@/components/InstagramFeed";
import LawyersShowcaseEnhanced from "@/components/LawyersShowcaseEnhanced";
import PracticeAreas from "@/components/PracticeAreas";
import Profile from "@/components/Profile";
import TeamSection from "@/components/Team/TeamSection";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <Profile />
      <PracticeAreas />
      <InstagramFeed />
      <LawyersShowcaseEnhanced />
      <TeamSection />
    </main>
  );
}
