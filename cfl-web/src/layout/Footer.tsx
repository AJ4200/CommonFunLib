import FloatingThemeToggle from "@/components/theme/FloatingThemeToggle";
import React from "react";
import { FaCircle, FaCodeBranch, FaServer } from "react-icons/fa";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return (
    <footer
      className="chrome-panel flex h-full w-full items-center justify-between gap-2 rounded-lg border-2 border-[var(--secondary)] px-2 sm:gap-3 sm:px-4"
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2 text-[0.68rem] font-black uppercase sm:gap-3 sm:text-xs">
        <span className="flex items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1.5 sm:px-3 sm:py-2">
          <FaCircle className="text-[0.55rem] text-[var(--secondary)]" />
          Ready
        </span>
        <span className="hidden items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-3 py-2 sm:flex">
          <FaServer />
          Web :3000
        </span>
        <span className="hidden items-center gap-2 rounded-md border border-[var(--secondary)] bg-black/10 px-3 py-2 md:flex">
          <FaCodeBranch />
          App Router
        </span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-xs font-black uppercase opacity-80 sm:inline">
          Theme
        </span>
        <FloatingThemeToggle />
      </div>
    </footer>
  );
};
export default Footer;
