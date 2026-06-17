// ThemeButton.tsx
import React from "react";
import Theme from "@/models/Theme";

interface ThemeButtonProps {
  theme: Theme;
  onClick: () => void;
  onMouseEnter: () => void;
  active?: boolean;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  theme,
  onClick,
  onMouseEnter,
  active = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tool-card mb-3 grid min-h-20 w-full grid-cols-[4.5rem_1fr] items-center gap-3 rounded-lg border p-3 text-left transition hover:-translate-y-0.5 ${
        active ? "border-[var(--secondary)] ring-2 ring-[var(--secondary)]" : "border-[var(--hairline)]"
      }`}
      onMouseEnter={onMouseEnter}
    >
      <span
        className="h-14 w-16 rounded-md border border-[var(--secondary)] bg-cover bg-center shadow-inner"
        style={{
          backgroundColor: theme.background,
          backgroundImage: theme.background_pattern,
        }}
      />
      <span className="min-w-0">
        <span className="brand-type block text-base font-black">{theme.name}</span>
        <span className="mt-2 flex gap-2">
          <span
            className="h-5 w-10 rounded border border-black/20"
            style={{ backgroundColor: theme.primaryColor.trim() }}
            title="Primary"
          />
          <span
            className="h-5 w-10 rounded border border-black/20"
            style={{ backgroundColor: theme.secondaryColor.trim() }}
            title="Secondary"
          />
          <span
            className="h-5 w-10 rounded border border-black/20"
            style={{ backgroundColor: theme.foreground.trim() }}
            title="Text"
          />
        </span>
      </span>
    </button>
  );
};

export default ThemeButton;
