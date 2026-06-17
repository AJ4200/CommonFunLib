import React, { useState } from "react";
import NavIcon from "@/models/NavIcon";
import navIcons from "@/lib/navicons";

interface IconNavProps {
  setActiveIconContent: (content: React.ReactNode) => void;
}

const IconNav: React.FC<IconNavProps> = ({ setActiveIconContent }) => {
  const [activeIcon, setActiveIcon] = useState<string | null>("Overview");

  const handleClick = (label: string, content: React.ReactNode) => {
    setActiveIcon(label);
    setActiveIconContent(content);
  };

  return (
    <nav className="glass-panel relative flex h-full w-20 shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-[var(--secondary)] p-1.5 backdrop-blur-lg sm:w-24 sm:gap-3 sm:p-2">
      {navIcons.map((icon: NavIcon, index: number) => {
        const isActive = activeIcon === icon.label;

        return (
          <button
            key={index}
            className={`group relative flex h-14 w-16 flex-col items-center justify-center overflow-hidden rounded-lg border text-[1.45rem] text-[var(--secondary)] transition hover:-translate-y-0.5 hover:bg-[var(--primary)] sm:h-[4.6rem] sm:w-20 sm:text-3xl ${
              isActive
                ? "border-[var(--secondary)] bg-[var(--primary)] shadow-inner"
                : "border-transparent"
            }`}
            onClick={() => handleClick(icon.label, icon.content)}
            title={icon.label}
            type="button"
          >
            {isActive ? (
              <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[var(--secondary)]" />
            ) : null}
            <span className={`icon-shadow transition ${isActive ? "-translate-y-2 sm:-translate-y-2.5" : "group-hover:-translate-y-2 sm:group-hover:-translate-y-2.5"}`}>{icon.icon}</span>
            <span
              className={`absolute bottom-1.5 max-w-[4.4rem] truncate px-1 text-center text-[0.58rem] font-black uppercase leading-none transition sm:bottom-2 sm:text-[0.65rem] ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              }`}
            >
              {icon.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default IconNav;
