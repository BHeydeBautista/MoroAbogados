export const navbarStyles = {
  navBg: (isDark: boolean) =>
    isDark
      ? "bg-gradient-to-b from-[#0F1C2E]/50 to-[#0F1C2E]/40 backdrop-blur-md shadow-none"
      : "bg-white shadow-md transition-all duration-300",

  navItem: (isDark: boolean) =>
    isDark
      ? "text-[#D4A75D] hover:text-white"
      : "text-black hover:text-gray-700",

  navContainer: (isDark: boolean) =>
    isDark
      ? "bg-[#0F1C2E]/60"
      : "bg-gray-100",

  submenuBg: (isDark: boolean) =>
    isDark
      ? "bg-[#0F1C2E]/95"
      : "bg-gray-100",

  submenuBorder: (isDark: boolean) =>
    isDark
      ? "border-[#D4A75D]/25"
      : "border-gray-200",

  submenuText: (isDark: boolean) =>
    isDark
      ? "text-white"
      : "text-gray-900",

  mobileNav: (isDark: boolean) =>
    isDark
      ? "border-[#D4A75D]/20 bg-gradient-to-b from-[#0F1C2E]/50 to-[#0F1C2E]/40"
      : "border-gray-200 bg-white",

  mobileBorder: (isDark: boolean) =>
    isDark
      ? "border-[#D4A75D]/20 bg-gradient-to-b from-[#0F1C2E]/50 to-[#0F1C2E]/40"
      : "border-gray-200 bg-white",

  langButton: (isDark: boolean, isActive: boolean) => {
    if (isDark) {
      return isActive
        ? "text-[#D4A75D] opacity-100"
        : "text-white opacity-60 hover:opacity-80";
    }
    return isActive
      ? "text-black opacity-100"
      : "text-gray-600 opacity-60 hover:opacity-80";
  },

  searchIcon: (isDark: boolean) =>
    isDark
      ? "text-[#D4A75D] hover:text-white"
      : "text-gray-600 hover:text-black",

  mobileButton: (isDark: boolean) =>
    isDark
      ? "text-[#D4A75D] hover:text-white"
      : "text-gray-600 hover:text-black",

  submenuButton: (isDark: boolean) =>
    isDark
      ? "text-[#D4A75D] hover:bg-[#D4A75D]/10 border-[#D4A75D]/20"
      : "text-black hover:bg-gray-100 border-gray-200",

  submenuLink: (isDark: boolean) =>
    isDark
      ? "text-white hover:text-[#D4A75D] hover:bg-[#D4A75D]/10"
      : "text-gray-900 hover:text-black hover:bg-gray-200",
};
