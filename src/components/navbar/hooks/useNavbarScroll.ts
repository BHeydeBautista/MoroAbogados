import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useNavbarScroll = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const isDark = !scrolled && isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrolled, isDark, isHome };
};
