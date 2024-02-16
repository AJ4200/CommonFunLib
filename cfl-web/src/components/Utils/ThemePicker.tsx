import { getTheme } from "@/lib/themes";
import { lighten } from "@/utils/utils";
import React, { useState, useEffect } from "react";
import { RiPaletteFill } from "react-icons/ri";

const ThemePickerModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedTheme = sessionStorage.getItem("THEME");
    if (!storedTheme) {
      setOpen(true);
    }
  }, []);

  const handleThemeChange = (themeName: string) => {
    const selectedTheme = getTheme(themeName);
    sessionStorage.setItem("THEME", themeName);
    applyTheme(selectedTheme);
    setOpen(false);
  };

  const applyTheme = (theme: any) => {
    // Set CSS variables for each theme color
    document.documentElement.style.setProperty(
      "--primary-color",
      theme.primaryColor
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      theme.secondaryColor
    );
    document.documentElement.style.setProperty(
      "--foreground-color",
      theme.foreground
    );
    document.documentElement.style.setProperty(
      "--background-color",
      theme.background
    );
  };

  return (
    <div
      className={`fixed top-0 center-0 w-full h-full backdrop-blur-lg bg-opacity-50 flex items-center justify-center ${
        open ? "" : "hidden"
      }`}
    >
      <div className="bg-teal-100 rounded-lg p-8 border shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Choose a Theme</h2>
        <button
          onClick={() => handleThemeChange("Classic")}
          className="block w-full py-2 px-4 mb-2 text-center border rounded-lg border-gray-400"
          style={{
            color: getTheme("Classic").primaryColor,
            background: getTheme("Classic").background_pattern,
          }}
        >
          <RiPaletteFill className="inline-block mr-2" /> Classic
        </button>
        <button
          onClick={() => handleThemeChange("Vanilla")}
          className="block w-full py-2 px-4 mb-2 text-center border border-gray-400 rounded-lg"
          style={{ color: getTheme("Vanilla").primaryColor }}
        >
          <RiPaletteFill className="inline-block mr-2" /> Vanilla
        </button>
        <button
          onClick={() => handleThemeChange("Cherry")}
          className="block w-full py-2 px-4 mb-2 text-center border border-gray-400 rounded-lg"
          style={{ color: getTheme("Cherry").primaryColor }}
        >
          <RiPaletteFill className="inline-block mr-2" /> Cherry
        </button>
        <button
          onClick={() => handleThemeChange("Blokz")}
          className="block w-full py-2 px-4 mb-2 text-center border border-gray-400 rounded-lg"
          style={{ color: getTheme("Blokz").primaryColor }}
        >
          <RiPaletteFill className="inline-block mr-2" /> Blokz
        </button>
      </div>
    </div>
  );
};

export default ThemePickerModal;
