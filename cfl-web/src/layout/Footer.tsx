"use client";

import AppearanceShuffleButton from "@/components/appearance/AppearanceShuffleButton";
import AppearanceNotice from "@/components/appearance/AppearanceNotice";
import PwaInstallButton from "@/components/pwa/PwaInstallButton";
import React from "react";
import { FaChevronRight, FaGithub, FaHeart } from "react-icons/fa";

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
      <div className="min-w-0 text-[0.72rem] font-black sm:text-xs">
        <a
          className="flex max-w-[46vw] items-center gap-1.5 truncate rounded-md border border-[var(--secondary)] bg-black/10 px-2 py-1.5 transition hover:-translate-y-0.5 hover:bg-black/15 sm:max-w-none sm:gap-2 sm:px-3 sm:py-2"
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
      </div>
      <button
        className="tool-card flex h-9 items-center justify-center gap-2 rounded-lg border border-[var(--secondary)] px-2 text-[0.65rem] font-black uppercase tracking-[0.08em] transition-transform hover:-translate-y-0.5 active:scale-95 sm:px-3"
        onClick={onOpenDataPrivacy}
        title="Open data and privacy details"
        type="button"
      >
        <span className="hidden sm:inline">Data & privacy</span>
        <FaChevronRight className="text-[var(--secondary)]" />
      </button>
      </footer>
    </>
  );
};
export default Footer;
