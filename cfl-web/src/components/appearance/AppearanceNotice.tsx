import React, { useEffect, useRef, useState } from "react";
import Font from "@/models/Font";
import Theme from "@/models/Theme";
import { fontChangedEvent } from "@/components/font/FontManager";
import { themeChangedEvent } from "@/components/theme/ThemeManager";
import { FaFont, FaMagic, FaPalette } from "react-icons/fa";

const AppearanceNotice: React.FC = () => {
  const [themeName, setThemeName] = useState<string | null>(null);
  const [fontName, setFontName] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [visible, setVisible] = useState(false);
  const readyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const readyTimer = setTimeout(() => {
      readyRef.current = true;
    }, 500);

    const showNotice = () => {
      if (!readyRef.current) return;
      setVisible(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setVisible(false);
        timerRef.current = null;
      }, 1800);
    };

    const handleThemeApplied = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;
      if (!nextTheme) return;
      setThemeName(nextTheme.name);
      setActiveTheme(nextTheme);
      showNotice();
    };

    const handleFontApplied = (event: Event) => {
      const nextFont = (event as CustomEvent<Font>).detail;
      if (!nextFont) return;
      setFontName(nextFont.name);
      showNotice();
    };

    window.addEventListener(themeChangedEvent, handleThemeApplied);
    window.addEventListener(fontChangedEvent, handleFontApplied);

    return () => {
      window.removeEventListener(themeChangedEvent, handleThemeApplied);
      window.removeEventListener(fontChangedEvent, handleFontApplied);
      clearTimeout(readyTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="appearance-notice pointer-events-none fixed bottom-[4.15rem] left-1/2 z-[1100] w-[min(92vw,25rem)] -translate-x-1/2 overflow-hidden rounded-2xl border-2 border-[var(--secondary)] text-[var(--foreground)] shadow-2xl sm:bottom-[4.9rem]">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundColor: activeTheme?.background ?? "var(--background)",
          backgroundImage: activeTheme?.background_pattern,
          backgroundSize: "cover",
        }}
      />
      <div className="relative bg-black/15 px-3 py-2.5 backdrop-blur-md sm:px-4 sm:py-3">
        <div className="flex items-center justify-between gap-3 border-b border-current/20 pb-2">
          <div className="flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.2em] opacity-75">
            <FaMagic className="text-[var(--secondary)]" />
            Appearance tuned
          </div>
          <span className="h-2 w-2 rounded-full bg-[var(--secondary)] shadow-[0_0_12px_var(--secondary)]" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="appearance-notice__item">
            <FaPalette className="text-[var(--secondary)]" />
            <span>
              <small>Theme</small>
              <strong>{themeName ?? "Current"}</strong>
            </span>
          </div>
          <div className="appearance-notice__item">
            <FaFont className="text-[var(--secondary)]" />
            <span>
              <small>Font</small>
              <strong>{fontName ?? "Current"}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceNotice;