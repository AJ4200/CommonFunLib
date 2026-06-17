// ThemeButton.tsx
import React from "react";
import { Button } from "../ui/button";
import Theme from "@/models/Theme";

interface ThemeButtonProps {
  theme: Theme;
  onClick: () => void;
  onMouseEnter: () => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  theme,
  onClick,
  onMouseEnter,
}) => {
  return (
    <Button
      onClick={onClick}
      className="mb-2 block min-h-12 w-full rounded-lg border border-[var(--secondary)] bg-cover bg-no-repeat px-4 py-2 text-center font-black shadow-inner transition hover:-translate-y-0.5"
      style={{
        color: theme.foreground,
        backgroundImage: theme.background_pattern,
      }}
      onMouseEnter={onMouseEnter}
    >
      {theme.name}
    </Button>
  );
};

export default ThemeButton;
