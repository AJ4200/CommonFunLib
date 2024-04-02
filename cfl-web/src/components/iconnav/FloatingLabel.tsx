import React from "react";

interface FloatingLabelProps {
  label: string;
}

const FloatingLabel: React.FC<FloatingLabelProps> = ({ label }) => {
  return (
    <div
      className="fixed left-1/2 transform -translate-x-1/2 top-1/2 px-4 py-2 text-[var(--foreground)] rounded-lg font-medium bg-contain z-50"
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
