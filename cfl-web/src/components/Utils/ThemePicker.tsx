// ThemePickerModal.tsx
import React, { useState, useEffect } from "react";
import ThemeButton from "./ThemeButton";
import { applyTheme } from "./ThemeManager";
import { getTheme } from "@/lib/themes";
import Theme from "@/models/Theme";
import { RiPaletteFill } from "react-icons/ri";

const ThemePickerModal = ({ initialOpen = false }) => {
  const [open, setOpen] = useState(initialOpen);
  const [pattern, setPattern] = useState("");
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    setThemes([getTheme("Classic"), getTheme("Vanilla"), getTheme("Cherry")]);
  }, []);

  const handleThemeChange = (themeName: string) => {
    const selectedTheme = getTheme(themeName);
    applyTheme(selectedTheme);
    setOpen(false);
  };

  const handleThemeHover = (themePattern: string) => {
    setPattern(themePattern);
  };

  return (
    <div
      className={`fixed w-full h-full backdrop-blur-lg flex items-center justify-center flex-col bg-no-repeat bg-cover ${
        open ? "" : "hidden"
      }`}
      style={{
        background: themes.find((theme) => theme.background_pattern === pattern)
          ?.background,
        backgroundImage: pattern,
      }}
    >
      <h1
        className="text-6xl md:text-8xl font-bold m-5"
        style={{
          color: themes.find((theme) => theme.background_pattern === pattern)
            ?.foreground,
        }}
      >
        Customize your Experience
      </h1>
      <div
        className="backdrop-blur-md rounded-lg p-8 border-[2px] shadow-2xl md:w-1/2"
        style={{
          borderColor: themes.find(
            (theme) => theme.background_pattern === pattern
          )?.secondaryColor,
        }}
      >
        <h2
          className="text-3xl font-bold mb-4 flex m-4 items-center space-x-2"
          style={{
            color: themes.find((theme) => theme.background_pattern === pattern)
              ?.foreground,
          }}
        >
          <RiPaletteFill className="text-4xl" /> Choose a Theme
        </h2>
        {themes.map((theme) => (
          <ThemeButton
            key={theme.name}
            theme={theme}
            onClick={() => handleThemeChange(theme.name)}
            onMouseEnter={() => handleThemeHover(theme.background_pattern)}
          />
        ))}
      </div>
      <span>
        You can still change your theme later by clicking this icon on the
        bottom right of your screen
      </span>
    </div>
  );
};

export default ThemePickerModal;
