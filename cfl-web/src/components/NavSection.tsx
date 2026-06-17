import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdGames } from "react-icons/md";
import { FaServer } from "react-icons/fa";

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
  const [hoveredTab, setHoveredTab] = useState(0);
  const [showLabel, setShowLabel] = useState(false);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const icons = [
    { icon: <BsInfoCircle />, tabIndex: 0, label: "Information" },
    { icon: <MdGames />, tabIndex: 1, label: "Playground" },
    { icon: <FaServer />, tabIndex: 2, label: "API Route" },
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden" {...props}>
      <header className="border-b border-[var(--secondary)] bg-black/10 px-3 py-3 sm:px-6 sm:py-4">
        <h2 className="brand-type text-2xl font-black theme-shadow sm:text-3xl">{heading}</h2>
        <p className="mt-1 max-w-4xl text-xs font-semibold opacity-85 sm:text-sm">{description}</p>
      </header>
      <div className="flex min-h-0 flex-1 flex-col-reverse gap-3 p-3 lg:flex-row lg:gap-4 lg:p-4">
        <div className="glass-panel min-h-0 flex-1 overflow-y-auto rounded-lg border border-[var(--secondary)] p-3 custome-scroll sm:p-4">
          {activeTab === 0 && infoContent}
          {activeTab === 1 && playgroundContent}
          {activeTab === 2 && apiContent}
        </div>
        <div className="flex shrink-0 flex-row gap-2 sm:gap-3 lg:w-44 lg:flex-col">
          {icons.map(({ icon, label, tabIndex }) => (
            <button
              key={tabIndex}
              className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--secondary)] p-2 text-xs font-black text-[var(--primary)] shadow-md transition hover:-translate-y-0.5 sm:min-h-12 sm:p-3 sm:text-sm lg:justify-start ${
                activeTab === tabIndex ? "icon-shadow ring-2 ring-[var(--primary)]" : ""
              } `}
              onClick={() => handleTabClick(tabIndex)}
              onMouseEnter={() => {
                setShowLabel(true);
                setHoveredTab(tabIndex);
              }}
              onMouseLeave={() => setShowLabel(false)}
              title={label}
            >
              <span className="text-lg">{icon}</span>
              <span className={`${activeTab === tabIndex || (showLabel && hoveredTab === tabIndex) ? "inline" : "hidden lg:inline"}`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavSection;
