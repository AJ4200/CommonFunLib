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
      className="block w-full py-2 px-4 mb-2 text-center border rounded-lg border-gray-400 bg-no-repeat bg-cover"
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
