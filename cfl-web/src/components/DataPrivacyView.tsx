"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaCompress, FaDatabase, FaExpand, FaGithub, FaHeart, FaLock } from "react-icons/fa";
import AppearanceShuffleButton from "@/components/appearance/AppearanceShuffleButton";
import FloatingFontToggle from "@/components/font/FloatingFontToggle";
import FloatingThemeToggle from "@/components/theme/FloatingThemeToggle";

interface DataPrivacyViewProps {
  onBack: () => void;
}

const DataPrivacyView = ({ onBack }: DataPrivacyViewProps) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  if (typeof window !== "undefined" && !mounted) {
    setMounted(true);
  }

  const renderView = (expanded: boolean) => (
    <section className={`relative flex h-full flex-col overflow-hidden ${expanded ? "chrome-panel w-full rounded-lg border-2 border-[var(--secondary)] shadow-2xl" : "w-full"}`}>
      <button
        className="icon-action absolute right-2 top-2 z-20 sm:right-3 sm:top-3"
        onClick={() => setFullscreen((current) => !current)}
        title={expanded ? "Exit full view" : "Open full view"}
        aria-label={expanded ? "Exit full view" : "Open full view"}
        type="button"
      >
        {expanded ? <FaCompress /> : <FaExpand />}
      </button>
      <header className="border-b border-[var(--secondary)] bg-black/10 px-3 py-3 pr-14 sm:px-6 sm:py-4 sm:pr-16">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] opacity-70">Transparency note</p>
            <h1 className="brand-type mt-1 text-3xl font-black theme-shadow sm:text-5xl">Data & privacy</h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 opacity-80">What this browser stores, what tool requests send, and where responsibility sits.</p>
          </div>
          <button className="action-secondary" onClick={onBack} type="button"><FaArrowLeft /> Overview</button>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-3 custome-scroll sm:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="tool-card rounded-2xl border border-[var(--secondary)] p-5 sm:p-7">
              <FaLock className="mb-4 text-2xl text-[var(--secondary)]" />
              <h2 className="brand-type text-2xl font-black">In your browser</h2>
              <p className="mt-3 text-sm font-semibold leading-7 opacity-85">Your selected theme and font are stored in local browser storage so the interface remembers your preferences. This web app does not use tracking cookies or create an account.</p>
            </section>
            <section className="tool-card rounded-2xl border border-[var(--secondary)] p-5 sm:p-7">
              <FaDatabase className="mb-4 text-2xl text-[var(--secondary)]" />
              <h2 className="brand-type text-2xl font-black">On the API server</h2>
              <p className="mt-3 text-sm font-semibold leading-7 opacity-85">When you run a tool, the necessary input is sent to the configured CommonFunLib API. The API may record routine server logs, but this web app does not keep a personal profile.</p>
            </section>
          </div>
          <section className="mt-4 rounded-2xl border border-[var(--secondary)] p-5 sm:p-7">
            <h2 className="brand-type text-2xl font-black">A useful rule of thumb</h2>
            <p className="mt-3 max-w-4xl text-sm font-semibold leading-7 opacity-85">Avoid entering secrets or sensitive personal information into tool inputs. The exact handling of a request depends on the API deployment that receives it.</p>
          </section>
        </div>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--secondary)] bg-black/10 px-3 py-3 sm:px-6">
        <a className="flex items-center gap-2 text-xs font-black transition hover:-translate-y-0.5" href="https://github.com/AJ4200" target="_blank" rel="noreferrer" title="AJ4200 on GitHub">
          <span>Made with</span><FaHeart className="text-[var(--secondary)]" /><span>by</span><FaGithub className="text-[var(--secondary)]" /><span>AJ4200</span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <AppearanceShuffleButton />
          <FloatingFontToggle />
          <FloatingThemeToggle />
        </div>
      </footer>
    </section>
  );

  if (fullscreen && mounted) {
    return <>{renderView(false)}{createPortal(<div className="p-1.5 sm:p-2" style={{ inset: 0, position: "fixed", zIndex: 1000 }}>{renderView(true)}</div>, document.body)}</>;
  }

  return renderView(false);
};

export default DataPrivacyView;