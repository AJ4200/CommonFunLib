import React, { useEffect, useRef, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { FaRandom } from "react-icons/fa";
import Font from "@/models/Font";
import Theme from "@/models/Theme";
import { getFonts } from "@/lib/fonts";
import { getTheme, getThemes } from "@/lib/themes";
import { applyFont, getCurrentFont, storeFont } from "@/components/font/FontManager";
import {
  applyTheme,
  getStoredTheme,
  storeTheme,
  themeChangedEvent,
} from "@/components/theme/ThemeManager";

const randomDifferent = <T extends { name: string }>(
  items: T[],
  currentName?: string | null
) => {
  const options = items.filter((item) => item.name !== currentName);
  const pool = options.length > 0 ? options : items;

  return pool[Math.floor(Math.random() * pool.length)];
};

const waitForFontReady = async () => {
  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }
};

const AppearanceShuffleButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>
    getTheme(getStoredTheme() ?? "Classic")
  );
  const mountedRef = useRef(true);

  useEffect(() => {
    const handleThemeApplied = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;

      if (nextTheme) {
        setCurrentTheme(nextTheme);
      }
    };

    window.addEventListener(themeChangedEvent, handleThemeApplied);

    return () => {
      mountedRef.current = false;
      window.removeEventListener(themeChangedEvent, handleThemeApplied);
    };
  }, []);

  const handleShuffle = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const nextTheme: Theme = randomDifferent(getThemes(), getStoredTheme() ?? "Classic");
    const nextFont: Font = randomDifferent(getFonts(), getCurrentFont().name);

    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
    storeTheme(nextTheme.name);
    applyFont(nextFont);
    storeFont(nextFont.name);

    await Promise.all([
      waitForFontReady(),
      new Promise((resolve) => window.setTimeout(resolve, 450)),
    ]);

    if (mountedRef.current) {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="tool-card grid h-8 w-8 place-items-center rounded-lg border border-[var(--secondary)] transition-transform hover:-translate-y-0.5 active:scale-95 disabled:cursor-wait disabled:opacity-80"
      title="Shuffle theme and font"
      aria-label="Shuffle theme and font"
      onClick={() => void handleShuffle()}
      disabled={loading}
    >
      <span
        className="grid h-5 w-5 place-items-center rounded bg-cover bg-center"
        style={{
          color: currentTheme.foreground,
          backgroundColor: currentTheme.background,
          backgroundImage: currentTheme.background_pattern,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {loading ? (
          <BiLoaderCircle className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <FaRandom className="h-3 w-3" />
        )}
      </span>
    </button>
  );
};

export default AppearanceShuffleButton;
