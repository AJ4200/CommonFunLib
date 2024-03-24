import React from "react";

interface FloatingLabelProps {
  label: string;
}

const FloatingLabel: React.FC<FloatingLabelProps> = ({ label }) => {
  return (
    <div
      className="fixed bottom-2 px-4 py-2 text-[var(--foreground)] rounded-lg font-medium bg-contain"
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
