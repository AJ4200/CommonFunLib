import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdGames } from "react-icons/md";
import { FaChevronRight, FaServer } from "react-icons/fa";

interface NavSectionProps {
  heading: string;
  description: string;
  infoContent: React.ReactNode;
  playgroundContent: React.ReactNode;
  apiContent: React.ReactNode;
}

const NavSection: React.FC<NavSectionProps> = ({
  heading,
  description,
  infoContent,
  playgroundContent,
  apiContent,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: <BsInfoCircle />,
      tabIndex: 0,
      label: "Docs",
      eyebrow: "Reference",
      content: infoContent,
    },
    {
      icon: <MdGames />,
      tabIndex: 1,
      label: "Playground",
      eyebrow: "Run",
      content: playgroundContent,
    },
    {
      icon: <FaServer />,
      tabIndex: 2,
      label: "API",
      eyebrow: "Routes",
      content: apiContent,
    },
  ];
  const activeMode = tabs.find((tab) => tab.tabIndex === activeTab) ?? tabs[0];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden" {...props}>
      <header className="border-b border-[var(--secondary)] bg-black/10 px-3 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="brand-type text-2xl font-black theme-shadow sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-1 max-w-4xl text-xs font-semibold opacity-85 sm:text-sm">
              {description}
            </p>
          </div>
          <div className="hidden rounded-lg border border-[var(--secondary)] bg-black/10 px-3 py-2 text-xs font-black uppercase sm:block">
            {activeMode.eyebrow} / {activeMode.label}
          </div>
        </div>

        <div
          className="mt-4 grid grid-cols-3 gap-2 rounded-lg border border-[var(--secondary)] bg-black/10 p-1.5 shadow-inner"
          role="tablist"
          aria-label={`${heading} workspace modes`}
        >
          {tabs.map(({ icon, label, eyebrow, tabIndex }) => {
            const isActive = activeTab === tabIndex;

            return (
              <button
                key={tabIndex}
                aria-selected={isActive}
                className={`group relative flex min-h-14 items-center justify-center gap-2 rounded-md border px-2 py-2 text-left transition sm:justify-start sm:px-3 ${
                  isActive
                    ? "border-[var(--secondary)] bg-[var(--secondary)] text-[var(--primary)] shadow-lg"
                    : "border-transparent bg-transparent hover:border-[var(--secondary)] hover:bg-white/10"
                }`}
                onClick={() => setActiveTab(tabIndex)}
                role="tab"
                type="button"
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-md text-lg ${
                    isActive ? "bg-[var(--primary)] text-[var(--secondary)]" : "bg-black/10"
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
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                  }`}
                />
              </button>
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
    </div>
  );
};

export default NavSection;
