import React, { useEffect, useRef, useState } from "react";
import Font from "@/models/Font";
import Theme from "@/models/Theme";
import { fontChangedEvent } from "@/components/font/FontManager";
import { themeChangedEvent } from "@/components/theme/ThemeManager";

const AppearanceNotice: React.FC = () => {
  const [themeName, setThemeName] = useState<string | null>(null);
  const [fontName, setFontName] = useState<string | null>(null);
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
    <div className="pointer-events-none fixed bottom-[4.25rem] left-1/2 z-[1100] -translate-x-1/2 rounded-xl border-2 border-[var(--secondary)] bg-[var(--background)] px-4 py-2 text-center text-xs font-black text-[var(--foreground)] shadow-2xl sm:bottom-[5rem] sm:px-5 sm:py-2.5 sm:text-sm">
      {themeName ? `Theme: ${themeName}` : null}
      {themeName && fontName ? " · " : null}
      {fontName ? `Font: ${fontName}` : null}
    </div>
  );
};

export default AppearanceNotice;