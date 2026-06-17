// ThemePicker.tsx
import React, { useState, useEffect } from "react";
import ThemeButton from "./ThemeButton";
import { applyTheme, getStoredTheme, storeTheme } from "./ThemeManager";
import { getTheme } from "@/lib/themes";
import Theme from "@/models/Theme";
import { RiPaletteFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

interface ThemeProps {
  initialOpen: boolean;
}

const ThemePicker: React.FC<ThemeProps> = ({ initialOpen }) => {
  const [open, setOpen] = useState(initialOpen);
  const [pattern, setPattern] = useState("");
  const [themes, setThemes] = useState<Theme[]>([]);
  const router = useRouter();

  useEffect(() => {
    setThemes([
      getTheme("Classic"),
      getTheme("Vanilla"),
      getTheme("Cherry"),
      getTheme("Emerald"),
      getTheme("Midnight"),
      getTheme("Sunset"),
    ]);
  }, []);


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

  const currentTheme = getTheme(getStoredTheme() as string);

  return (
    <div
      className={`fixed inset-0 flex h-full w-full flex-col items-center justify-center overflow-y-auto bg-cover bg-no-repeat p-4 backdrop-blur-lg app-scroll ${
        open ? "" : "hidden"
      }`}
      style={{
        backgroundColor: currentTheme?.background,
        backgroundImage: pattern,
      }}
    >
      <h1
        className="brand-type m-5 text-center text-4xl font-black theme-shadow sm:text-6xl md:text-8xl"
        style={{
          color: currentTheme?.foreground,
        }}
      >
        Customize your Experience
      </h1>
      <div
        className="w-full max-w-2xl rounded-lg border-[2px] bg-black/10 p-5 shadow-2xl backdrop-blur-md sm:p-8"
        style={{
          borderColor: currentTheme?.secondaryColor,
        }}
      >
        <h2
          className="m-2 mb-4 flex items-center gap-2 text-2xl font-black sm:m-4 sm:text-3xl"
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
    </div>
  );
};

export default ThemePicker;
