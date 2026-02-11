"use client";
import React, { useState } from "react";
import HeroVideo from "./HeroVideo";
import HeroContent from "./HeroContent";
import HeroControls from "./HeroControls";

const videoList = [
  {
    src: "https://res.cloudinary.com/de3x5vn0g/video/upload/f_auto,q_auto/v1766844211/Torre_vyd7gl_qihk1i.mp4",
    desktopPosition: "center 30%",
    mobilePosition: "center center",
  },
  {
    src: "https://res.cloudinary.com/de3x5vn0g/video/upload/f_auto,q_auto/v1770229530/hall_z2hwhj.mp4",
    desktopPosition: "center 85%",
    mobilePosition: "center center",
  },
  {
    src: "https://res.cloudinary.com/de3x5vn0g/video/upload/f_auto,q_auto/v1767807783/Entrada_nlhovu.mov",
    desktopPosition: "center 45%",
    mobilePosition: "center center",
  },
  {
    src: "https://res.cloudinary.com/de3x5vn0g/video/upload/f_auto,q_auto/v1770229000/entrada1_chgau7.mp4",
    desktopPosition: "center 45%",
    mobilePosition: "center center",
  },
  {
    src: "https://res.cloudinary.com/de3x5vn0g/video/upload/f_auto,q_auto/v1770229227/entrada2_uawi0m.mp4",
    desktopPosition: "center 45%",
    mobilePosition: "center center",
  },
  {
    src: "https://res.cloudinary.com/dfb0e4gdz/video/upload/f_auto,q_auto,c_fill,g_center,y_-400,ar_16:9/v1770737601/iglesia2_drrtc0.mov",
    desktopPosition: "center 100%",
    mobilePosition: "center center",
  },
  {
    
    src: "https://res.cloudinary.com/dfb0e4gdz/video/upload/f_auto,q_auto,c_fill,g_center,y_-400,ar_16:9/v1767969129/casa_gob_cybnts.mov",
    desktopPosition: "center -27%",
    mobilePosition: "center center",
    desktopScale: 1.28,
  },
  {
    
    src: "https://res.cloudinary.com/dfb0e4gdz/video/upload/f_auto,q_auto,c_fill,g_center,y_-400,ar_16:9/v1769789216/stafe_of4bcv.mov",
    desktopPosition: "center 75%",
    mobilePosition: "center center",
  },
];



const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [repeatToken, setRepeatToken] = useState(0);

  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % videoList.length);
  };

  return (
    <section className="relative w-full h-[calc(100vh-6rem)] min-h-[50vh] overflow-hidden bg-[#0F1C2E]">
      <HeroVideo
        currentIndex={currentIndex}
        videoList={videoList}
        onEnded={handleVideoEnded}
        isPlaying={isPlaying}
        repeatToken={repeatToken}
      />

      <HeroContent />

      <HeroControls
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        videoList={videoList}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((prev) => !prev)}
        onRepeat={() => setRepeatToken((prev) => prev + 1)}
      />
    </section>
  );
};

export default HeroCarousel;
