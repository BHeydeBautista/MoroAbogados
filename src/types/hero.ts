export interface HeroVideoProps {
  currentIndex: number;
  videoList: string[];
  onEnded?: () => void;
}

export interface HeroControlsProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
  videoList: string[];
}
