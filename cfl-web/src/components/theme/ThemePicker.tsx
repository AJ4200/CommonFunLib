// ThemePicker.tsx
import React, { useState, useEffect } from "react";
import ThemeButton from "./ThemeButton";
import { applyTheme, storeTheme } from "./ThemeManager";
import { getTheme } from "@/lib/themes";
import Theme from "@/models/Theme";
import { RiPaletteFill } from "react-icons/ri";
import { useRouter } from "next/router";

interface ThemeProps {
  initialOpen: boolean;
}

const ThemePicker: React.FC<ThemeProps> = ({ initialOpen }) => {
  const [open, setOpen] = useState(initialOpen);
  const [pattern, setPattern] = useState("");
  const [themes, setThemes ] = useState<Theme[]>([]);
  const router = useRouter();

  useEffect(() => {
    setThemes([getTheme("Classic"), getTheme("Vanilla"), getTheme("Cherry")]);
  }, []);

  const getCurrentTheme = () => {
    return themes.find((theme) => theme.background_pattern === pattern);
  };

  const handleThemeChange = (themeName: string) => {
    const selectedTheme = getTheme(themeName);
    applyTheme(selectedTheme);
    setOpen(false);
    storeTheme(selectedTheme.name);
    router.push("/homepage");
  };

  const handleThemeHover = (themePattern: string) => {
    setPattern(themePattern);
  };

  const currentTheme = getCurrentTheme();

  return (
    <div
      className={`fixed w-full h-full backdrop-blur-lg flex items-center justify-center flex-col bg-no-repeat bg-cover ${
        open ? "" : "hidden"
      }`}
      style={{
        background: currentTheme?.background,
        backgroundImage: pattern,
      }}
    >
      <h1
        className="text-6xl md:text-8xl font-bold m-5"
        style={{
          color: currentTheme?.foreground,
        }}
      >
        Customize your Experience
      </h1>
      <div
        className="backdrop-blur-md rounded-lg p-8 border-[2px] shadow-2xl md:w-1/2"
        style={{
          borderColor: currentTheme?.secondaryColor,
        }}
      >
        <h2
          className="text-3xl font-bold mb-4 flex m-4 items-center space-x-2"
          style={{
            color: currentTheme?.foreground,
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

      <button
        className="absolute top-5 right-5 bg-red-500 text-white rounded-full p-2 shadow-lg"
        onClick={() => setOpen(false)}
      >
        Close
      </button>
    </div>
  );
};

export default ThemePicker;
