"use client";

import AppearanceNotice from "@/components/appearance/AppearanceNotice";
import AppearanceShuffleButton from "@/components/appearance/AppearanceShuffleButton";
import FloatingFontToggle from "@/components/font/FloatingFontToggle";
import PwaInstallButton from "@/components/pwa/PwaInstallButton";
import FloatingThemeToggle from "@/components/theme/FloatingThemeToggle";
import React from "react";
import { FaChevronUp, FaGithub, FaHeart } from "react-icons/fa";

interface FooterProps {
  onOpenDataPrivacy?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenDataPrivacy, ...props }) => {
  return (
    <>
      <AppearanceNotice />
      <footer
        className="chrome-panel grid h-full w-full grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg border-2 border-[var(--secondary)] px-2 sm:gap-3 sm:px-4"
        {...props}
      >
      <div className="flex items-center justify-start">
        <PwaInstallButton />
      </div>
        <div className="flex min-w-0 items-center justify-center gap-1 text-[0.72rem] font-black sm:gap-2 sm:text-xs">
          <a
            className="flex max-w-[42vw] min-w-0 items-center gap-1.5 truncate rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1.5 transition hover:-translate-y-0.5 hover:bg-black/15 sm:max-w-none sm:gap-2 sm:px-3 sm:py-2"
            href="https://github.com/AJ4200"
            target="_blank"
            rel="noreferrer"
            title="AJ4200 on GitHub"
          >
            <span className="hidden sm:inline">Made with</span>
            <FaHeart className="shrink-0 text-[var(--secondary)]" />
            <span className="hidden sm:inline">by</span>
            <FaGithub className="shrink-0 text-[var(--secondary)]" />
            <span className="truncate">AJ4200</span>
          </a>
          <button
            className="tool-card grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[var(--secondary)] transition-transform hover:-translate-y-0.5 active:scale-95"
            onClick={onOpenDataPrivacy}
            title="Open data and privacy details"
            aria-label="Open data and privacy details"
            type="button"
          >
            <FaChevronUp className="text-[var(--secondary)]" />
          </button>
      </div>
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <AppearanceShuffleButton />
          <FloatingFontToggle />
          <FloatingThemeToggle />
        </div>
      </footer>
    </>
  );
};
export default Footer;
