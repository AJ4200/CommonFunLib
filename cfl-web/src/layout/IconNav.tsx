import React from "react";
import NavIcon from "@/models/NavIcon";
import navIcons from "@/lib/navicons";

const IconNav: React.FC = () => {
  return (
    <div
      className="flex flex-col h-full w-16 rounded-xl bg-[var(--primary)] border-[var(--secondary)] border-2 shadow-2xl"

    >
      {navIcons.map((icon: NavIcon, index: number) => (
        <div key={index} className="mb-4 relative">
          <span className="absolute opacity-0 w-max px-2 py-1 bg-gray-800 text-white rounded-lg transition-opacity duration-300 ease-in-out pointer-events-none whitespace-nowrap">
            {icon.label}
          </span>
          <span className="group" aria-label={icon.label}>
            {icon.icon}
          </span>
        </div>
      ))}
    </div>
  );
};

export default IconNav;
