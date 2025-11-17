import HeroCarousel from "@/components/hero/HeroCarousel";
import PostsContent from "@/components/Posts/PostsContent";
import PracticeAreas from "@/components/areas/PracticeAreas";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <Profile />
      <PracticeAreas />
      <PostsContent />
    </main>
  );
}
