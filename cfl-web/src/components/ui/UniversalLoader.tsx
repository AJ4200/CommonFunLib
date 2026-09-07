import React from "react";

interface UniversalLoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  overlay?: boolean;
  className?: string;
}

const UniversalLoader: React.FC<UniversalLoaderProps> = ({
  label = "Loading",
  size = "md",
  overlay = false,
  className = "",
}) => (
  <div
    className={`universal-loader universal-loader--${size} ${overlay ? "universal-loader--overlay" : ""} ${className}`}
    role="status"
    aria-live="polite"
    aria-label={label}
  >
    <span className="universal-loader__mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
    <span className="universal-loader__label">{label}</span>
  </div>
);

export default UniversalLoader;
