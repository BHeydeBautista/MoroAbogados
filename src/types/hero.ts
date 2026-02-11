export interface HeroVideoItem {
  src: string;
  desktopPosition: string;
  mobilePosition: string;
  desktopScale?: number;
  mobileScale?: number;
}

export interface HeroVideoProps {
  currentIndex: number;
  videoList: HeroVideoItem[];
  onEnded?: () => void;
  isPlaying?: boolean;
  repeatToken?: number;
}

export interface HeroControlsProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
  videoList: HeroVideoItem[];
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRepeat: () => void;
}
