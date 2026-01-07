export interface HeroVideoItem {
  src: string;
  desktopPosition: string;
  mobilePosition: string;
}

export interface HeroVideoProps {
  currentIndex: number;
  videoList: HeroVideoItem[];
  onEnded?: () => void;
}

export interface HeroControlsProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
  videoList: HeroVideoItem[];
}
