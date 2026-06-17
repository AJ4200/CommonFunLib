import React, { useState } from "react";
import NavIcon from "@/models/NavIcon";
import navIcons from "@/lib/navicons";
import FloatingLabel from "@/components/iconnav/FloatingLabel";

interface IconNavProps {
  setActiveIconContent: (content: React.ReactNode) => void;
}

const IconNav: React.FC<IconNavProps> = ({ setActiveIconContent }) => {
  const [activeIcon, setActiveIcon] = useState<string | null>("Overview");
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const handleMouseOver = (label: string) => {
    setHoveredLabel(label);
  };

  const handleMouseLeave = () => {
    setHoveredLabel(null);
  };

  const handleClick = (label: string, content: React.ReactNode) => {
    setActiveIcon(label);
    setActiveIconContent(content);
  };

  return (
    <>
      <nav className="glass-panel relative flex h-full w-14 shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-[var(--secondary)] p-1.5 backdrop-blur-lg sm:w-20 sm:gap-3 sm:p-2">
        {navIcons.map((icon: NavIcon, index: number) => (
          <button
            key={index}
            className={`relative grid h-10 w-10 place-items-center rounded-lg text-2xl text-[var(--secondary)] transition hover:-translate-y-0.5 hover:bg-[var(--primary)] sm:h-14 sm:w-14 sm:text-3xl ${
              activeIcon === icon.label
                ? "bg-[var(--primary)] border border-[var(--secondary)] shadow-inner"
                : ""
            }`}
            onMouseOver={() => handleMouseOver(icon.label)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(icon.label, icon.content)}
            title={icon.label}
          >
            {activeIcon === icon.label ? (
              <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[var(--secondary)]" />
            ) : null}
            <span className="icon-shadow">{icon.icon}</span>
          </button>
        ))}
      </nav>
      {hoveredLabel && <FloatingLabel label={hoveredLabel} />}
    </>
  );
};

export default IconNav;
