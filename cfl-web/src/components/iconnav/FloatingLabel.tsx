import React from "react";

interface FloatingLabelProps {
  label: string;
}

const FloatingLabel: React.FC<FloatingLabelProps> = ({ label }) => {
  return (
    <div
      className="pointer-events-none fixed left-16 top-1/2 z-50 hidden -translate-y-1/2 rounded-lg border border-[var(--secondary)] bg-contain px-4 py-2 font-bold text-[var(--foreground)] shadow-2xl sm:left-24 sm:block"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: "var(--background-image)",
      }}
    >
      {label}
    </div>
  );
};

export default FloatingLabel;
