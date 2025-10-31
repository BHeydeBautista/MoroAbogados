"use client";
import { motion } from "framer-motion";
import StoryIntro from "@/components/About/StoryIntro";
import ProfileSection from "@/components/About/ProfileSection";
import Timeline from "@/components/About/Timeline";
import TeamSection from "@/components/About/TeamSection";
import StudioGallery from "@/components/About/StudioGallery";

export default function NosotrosPage() {
  return (
    <main className="bg-[#0A1320] text-white overflow-hidden">
      {/* Hero */}
      <StoryIntro />

      {/* Sección Historia */}
      <section className="bg-white text-[#0F1C2E] py-24">
        <ProfileSection />
      </section>

      {/* Timeline */}
      <section className="bg-[#0A1320] py-24 text-white">
        <Timeline />
      </section>

      {/* Equipo */}
      <section className="bg-gradient-to-b from-[#0A1320] to-[#071224] py-24">
        <TeamSection />
      </section>

      {/* Galería */}
      <section className="bg-white text-[#0F1C2E] py-24">
        <StudioGallery />
      </section>
    </main>
  );
}
