export interface HeroVideoProps {
  currentIndex: number;
  videoList: string[];
}

export interface HeroControlsProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
  videoList: string[];
}
