"use client";

import AppearanceShuffleButton from "@/components/appearance/AppearanceShuffleButton";
import AppearanceNotice from "@/components/appearance/AppearanceNotice";
import FloatingFontToggle from "@/components/font/FloatingFontToggle";
import PwaInstallButton from "@/components/pwa/PwaInstallButton";
import FloatingThemeToggle from "@/components/theme/FloatingThemeToggle";
import React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FaChevronUp, FaDatabase, FaGithub, FaHeart, FaLock, FaTimes } from "react-icons/fa";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({ ...props }) => {
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
      <Drawer direction="bottom">
        <DrawerTrigger asChild>
          <button
            className="tool-card flex h-9 items-center justify-center gap-2 rounded-lg border border-[var(--secondary)] px-2 text-[0.65rem] font-black uppercase tracking-[0.08em] transition-transform hover:-translate-y-0.5 active:scale-95 sm:px-3"
            title="Open data and privacy details"
            type="button"
          >
            <span className="hidden sm:inline">Data & privacy</span>
            <FaChevronUp className="text-[var(--secondary)]" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="fixed inset-x-0 bottom-0 top-auto z-50 mt-0 h-[86dvh] w-full rounded-t-2xl border-0 bg-transparent p-0 outline-none sm:h-[80dvh] [&>div:first-child]:hidden">
          <div className="chrome-panel flex h-full w-full overflow-hidden rounded-t-2xl border-t-2 border-[var(--secondary)]">
            <div className="glass-panel flex h-full w-full flex-col overflow-hidden rounded-t-2xl">
              <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--secondary)] bg-black/10 px-4 py-4 sm:px-6">
                <div>
                  <h2 className="brand-type text-2xl font-black">Data & privacy</h2>
                  <p className="mt-1 text-sm font-semibold opacity-80">A quick, plain-language note about what this app keeps.</p>
                </div>
                <DrawerClose className="icon-action" title="Close data and privacy details">
                  <FaTimes />
                </DrawerClose>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 app-scroll sm:px-6">
                <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
                  <section className="rounded-lg border border-[var(--secondary)] bg-black/10 p-4">
                    <FaLock className="mb-3 text-[var(--secondary)]" />
                    <h3 className="brand-type text-lg font-black">In your browser</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 opacity-85">Your selected theme and font are stored in local browser storage so the interface remembers your preferences. The app does not use tracking cookies.</p>
                  </section>
                  <section className="rounded-lg border border-[var(--secondary)] bg-black/10 p-4">
                    <FaDatabase className="mb-3 text-[var(--secondary)]" />
                    <h3 className="brand-type text-lg font-black">On the API server</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 opacity-85">When you run a tool, the necessary input is sent to the configured CommonFunLib API. The API may record routine server logs, but this web app does not create an account or keep a personal profile.</p>
                  </section>
                </div>
                <p className="mx-auto mt-5 max-w-4xl text-sm font-semibold leading-6 opacity-80">Avoid entering secrets or sensitive personal information into tool inputs. The exact handling of a request depends on the API deployment that receives it.</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--secondary)] bg-black/10 px-4 py-3 sm:px-6">
                <a
                  className="flex items-center gap-2 text-xs font-black transition hover:-translate-y-0.5"
                  href="https://github.com/AJ4200"
                  target="_blank"
                  rel="noreferrer"
                  title="AJ4200 on GitHub"
                >
                  <span>Made with</span>
                  <FaHeart className="text-[var(--secondary)]" />
                  <span>by</span>
                  <FaGithub className="text-[var(--secondary)]" />
                  <span>AJ4200</span>
                </a>
                <div className="flex items-center gap-2 sm:gap-3">
                  <AppearanceShuffleButton />
                  <FloatingFontToggle />
                  <FloatingThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      </footer>
    </>
  );
};
export default Footer;
