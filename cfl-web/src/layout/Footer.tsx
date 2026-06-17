import FloatingThemeToggle from "@/components/theme/FloatingThemeToggle";
import React from "react";
import { FaHeart } from "react-icons/fa";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return (
    <footer
      className="chrome-panel relative flex h-full w-full items-center justify-between gap-2 rounded-lg border-2 border-[var(--secondary)] px-2 sm:gap-3 sm:px-4"
      {...props}
    >
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center text-[0.72rem] font-black sm:text-xs">
        <span className="flex items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1.5 sm:px-3 sm:py-2">
          Made with <FaHeart className="text-[var(--secondary)]" /> by AJ4200
        </span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <FloatingThemeToggle />
      </div>
    </footer>
  );
};
export default Footer;
