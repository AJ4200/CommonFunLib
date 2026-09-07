"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsInfoCircle } from "react-icons/bs";
import { MdGames } from "react-icons/md";
import { FaChevronRight, FaCompress, FaExpand, FaNpm, FaServer, FaTags } from "react-icons/fa";
import UniversalTooltip from "@/components/ui/UniversalTooltip";

interface NavSectionProps {
  heading: string;
  description: string;
  splashIcon?: React.ReactNode;
  catalog?: string[];
  splashVariant?: "functions" | "generators" | "converters" | "hashing";
  infoContent: React.ReactNode;
  playgroundContent: React.ReactNode;
  apiContent: React.ReactNode;
  packageContent?: React.ReactNode;
}

const NavSection: React.FC<NavSectionProps> = ({
  heading,
  description,
  splashIcon,
  catalog = [],
  splashVariant = "functions",
  infoContent,
  playgroundContent,
  apiContent,
  packageContent,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = window.setTimeout(() => setShowSplash(false), 2200);

    return () => window.clearTimeout(timer);
  }, []);

  const tabs = [
    {
      icon: <BsInfoCircle />,
      tabIndex: 0,
      label: "Docs",
      eyebrow: "Reference",
      description: "Browse explanations, examples, and the complete tool catalog.",
      content: infoContent,
    },
    {
      icon: <MdGames />,
      tabIndex: 1,
      label: "Playground",
      eyebrow: "Run",
      description: "Try a tool interactively with sample inputs and live results.",
      content: playgroundContent,
    },
    {
      icon: <FaServer />,
      tabIndex: 2,
      label: "API",
      eyebrow: "Routes",
      description: "Inspect the HTTP routes and request shapes for this section.",
      content: apiContent,
    },
    ...(packageContent
      ? [
          {
            icon: <FaNpm />,
            tabIndex: 3,
            label: "Package",
            eyebrow: "npm",
            description: "See the local package helpers for using these tools in code.",
            content: packageContent,
          },
        ]
      : []),
  ];
  const activeMode = tabs.find((tab) => tab.tabIndex === activeTab) ?? tabs[0];

  const renderSection = (expanded: boolean) => (
    <div
      className={`relative flex flex-col overflow-hidden ${
        expanded
          ? "chrome-panel h-full w-full rounded-lg border-2 border-[var(--secondary)] shadow-2xl"
          : "h-full w-full"
      }`}
      {...(!expanded ? props : {})}
    >
      <button
        className="icon-action absolute right-2 top-2 z-20 sm:right-3 sm:top-3"
        type="button"
        title={expanded ? "Exit full view" : "Open full view"}
        aria-label={expanded ? "Exit full view" : "Open full view"}
        onClick={() => setFullscreen((current) => !current)}
      >
        {expanded ? <FaCompress /> : <FaExpand />}
      </button>

      <header className="border-b border-[var(--secondary)] bg-black/10 px-3 py-3 pr-14 sm:px-6 sm:py-4 sm:pr-16">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="brand-type text-2xl font-black theme-shadow sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-1 max-w-4xl text-xs font-semibold opacity-85 sm:text-sm">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden rounded-lg border border-[var(--secondary)] bg-black/10 px-3 py-2 text-xs font-black uppercase sm:block">
              {activeMode.eyebrow} / {activeMode.label}
            </div>
          </div>
        </div>

        <div
          className="nav-mode-switch mt-4"
          style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
          role="tablist"
          aria-label={`${heading} workspace modes`}
        >
          {tabs.map(({ icon, label, eyebrow, description: tabDescription, tabIndex }) => {
            const isActive = activeTab === tabIndex;

            return (
              <UniversalTooltip
                key={tabIndex}
                tooltipContent={
                  <div>
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] opacity-65">
                      {heading} / {eyebrow}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-5">{tabDescription}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {catalog.slice(0, 6).map((tool) => (
                        <span
                          className="inline-flex items-center gap-1 rounded-full border border-current/30 px-2 py-1 text-[0.62rem] font-black"
                          key={tool}
                        >
                          <FaTags className="text-[0.55rem]" />
                          {tool}
                        </span>
                      ))}
                      {catalog.length > 6 ? (
                        <span className="rounded-full border border-current/30 px-2 py-1 text-[0.62rem] font-black">
                          +{catalog.length - 6} more
                        </span>
                      ) : null}
                    </div>
                  </div>
                }
              >
                <button
                  aria-selected={isActive}
                  className={`nav-mode-button group flex w-full items-center justify-center gap-2 rounded-md border px-2 py-2 text-left transition sm:justify-start sm:px-3 ${
                    isActive
                      ? "border-[var(--secondary)] bg-[var(--secondary)] text-[var(--primary)] shadow-lg"
                      : "border-transparent bg-black/5 hover:border-[var(--secondary)] hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTab(tabIndex)}
                  role="tab"
                  type="button"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border text-lg transition ${
                      isActive
                        ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--secondary)]"
                        : "border-[var(--secondary)] bg-black/10 group-hover:scale-105"
                    }`}
                  >
                    {icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-black uppercase opacity-70">
                      {eyebrow}
                    </span>
                    <span className="brand-type block truncate text-sm font-black sm:text-base">
                      {label}
                    </span>
                  </span>
                  <FaChevronRight
                    className={`ml-auto hidden text-xs transition sm:block ${
                      isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-80"
                    }`}
                  />
                  {isActive ? (
                    <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-current opacity-80" />
                  ) : null}
                </button>
              </UniversalTooltip>
            );
          })}
        </div>
      </header>
      <div className="min-h-0 flex-1 p-3 sm:p-4">
        <div
          className="glass-panel h-full overflow-y-auto rounded-lg border border-[var(--secondary)] p-3 custome-scroll sm:p-4"
          role="tabpanel"
        >
          {activeMode.content}
        </div>
      </div>
      {showSplash ? (
        <div className={`category-splash category-splash--${splashVariant}`} role="status" aria-live="polite">
          <div className="category-splash__grid" />
          <div className="category-splash__content">
            <span className="category-splash__icon" aria-hidden="true">{splashIcon}</span>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.28em] opacity-70">CommonFunLib / catalog loaded</p>
            <h3 className="brand-type mt-2 text-4xl font-black theme-shadow sm:text-6xl">{heading}</h3>
            <p className="mt-3 max-w-xl text-sm font-bold leading-6 opacity-80">{description}</p>
            <div className="category-splash__tools">
              {catalog.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] opacity-65">
              <span className="splash-progress" />
              Loading tool
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (fullscreen && mounted) {
    return (
      <>
        {renderSection(false)}
        {createPortal(
          <div
            className="p-1.5 sm:p-2"
            style={{ inset: 0, position: "fixed", zIndex: 1000 }}
          >
            {renderSection(true)}
          </div>,
          document.body
        )}
      </>
    );
  }

  return renderSection(false);
};

export default NavSection;
