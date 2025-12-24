import React from "react";

interface HoverLinkProps {
  url: string;
  children: React.ReactNode;
  onPress?: () => void;
  isDark?: boolean;
}

export const HoverLink: React.FC<HoverLinkProps> = ({
  url,
  children,
  onPress,
  isDark = true,
}) => {
  return (
    <a
      href={url}
      onClick={onPress}
      className={`block px-4 py-2 rounded-lg transition-colors ${
        isDark
          ? "text-white hover:text-[#D4A75D] hover:bg-[#D4A75D]/10"
          : "text-gray-900 hover:text-black hover:bg-gray-200"
      }`}
    >
      {children}
    </a>
  );
};
