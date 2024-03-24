import React, { useState } from "react";
import NavIcon from "@/models/NavIcon";
import navIcons from "@/lib/navicons";
import FloatingLabel from "@/components/iconnav/FloatingLabel";

const IconNav: React.FC = () => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const handleMouseOver = (label: string) => {
    setHoveredLabel(label);
  };

  const handleMouseLeave = () => {
    setHoveredLabel(null);
  };

  return (
    <div className="flex flex-col h-full w-16 rounded-xl backdrop-blur-lg border-[var(--secondary)] border-2 shadow-2xl items-center justify-center space-y-2 relative">
      {navIcons.map((icon: NavIcon, index: number) => (
        <div
          key={index}
          className="text-4xl text-[var(--secondary)] hover:text-[var(--secondary)] hover:bg-[var(--primary)] m-2 p-2 rounded-md"
          onMouseOver={() => handleMouseOver(icon.label)}
          onMouseLeave={handleMouseLeave}
        >
          <span>{icon.icon}</span>
        </div>
      ))}
      {hoveredLabel && <FloatingLabel label={hoveredLabel} />}
    </div>
  );
};

export default IconNav;
