import HeroCarousel from "@/components/hero/HeroCarousel";
import PostsContent from "@/components/Posts/PostsContent";
import LawyersShowcaseEnhanced from "@/components/lawyers/LawyersShowcaseEnhanced";
import PracticeAreas from "@/components/PracticeAreas";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <Profile />
      <PracticeAreas />
      <PostsContent />
      <LawyersShowcaseEnhanced />
    </main>
  );
}
