import React, { useState } from "react";
import NavIcon from "@/models/NavIcon";
import navIcons from "@/lib/navicons";
import FloatingLabel from "@/components/iconnav/FloatingLabel";

interface IconNavProps {
  setActiveIconContent: (content: React.ReactNode) => void;
}

const IconNav: React.FC<IconNavProps> = ({ setActiveIconContent }) => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const handleMouseOver = (label: string) => {
    setHoveredLabel(label);
  };

  const handleMouseLeave = () => {
    setHoveredLabel(null);
  };

  const handleClick = (label: string, content: React.ReactNode) => {
    setActiveIcon(label);
    setActiveIconContent(content); // Set active icon content
  };

  return (
    <div className="flex flex-col h-full w-16 rounded-xl backdrop-blur-lg border-[var(--secondary)] border-2 shadow-2xl items-center justify-center space-y-2 relative">
      {navIcons.map((icon: NavIcon, index: number) => (
        <div
          key={index}
          className={`text-4xl text-[var(--secondary)] hover:text-[var(--secondary)] hover:bg-[var(--primary)] m-2 p-2 rounded-md ${
            activeIcon === icon.label
              ? "bg-[var(--primary)] border border-[var(--secondary)]"
              : ""
          }`}
          onMouseOver={() => handleMouseOver(icon.label)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(icon.label, icon.content)}
        >
          <span className="icon-shadow">{icon.icon}</span>
        </div>
      ))}
      {hoveredLabel && <FloatingLabel label={hoveredLabel} />}
    </div>
  );
};

export default IconNav;
