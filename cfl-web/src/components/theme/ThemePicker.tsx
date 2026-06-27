// ThemePicker.tsx
import React, { useState, useEffect, useRef } from "react";
import FontButton from "@/components/font/FontButton";
import {
  applyFont,
  getCurrentFont,
  storeFont,
} from "@/components/font/FontManager";
import { getFont, getFonts } from "@/lib/fonts";
import ThemeButton from "./ThemeButton";
import { applyTheme, getStoredTheme, storeTheme } from "./ThemeManager";
import { getTheme, getThemes } from "@/lib/themes";
import Font from "@/models/Font";
import Theme from "@/models/Theme";
import { RiPaletteFill } from "react-icons/ri";
import { BiLoaderCircle } from "react-icons/bi";
import { FaFont, FaRandom } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ThemeProps {
  initialOpen: boolean;
}

const ThemePicker: React.FC<ThemeProps> = ({ initialOpen }) => {
  const [open, setOpen] = useState(initialOpen);
  const [pattern, setPattern] = useState("");
  const [themes, setThemes] = useState<Theme[]>([]);
  const [fonts, setFonts] = useState<Font[]>([]);
  const [choosing, setChoosing] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>
    getTheme(getStoredTheme() ?? "Classic")
  );
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [currentFont, setCurrentFont] = useState<Font>(() => getCurrentFont());
  const currentThemeRef = useRef(currentTheme);
  const currentFontRef = useRef(currentFont);
  const router = useRouter();
  const visibleTheme = previewTheme ?? currentTheme;

  useEffect(() => {
    setThemes(getThemes());
    setFonts(getFonts());
    applyTheme(currentTheme);
    applyFont(currentFont);
  }, []);


  const handleThemeChange = (themeName: string) => {
    const selectedTheme = getTheme(themeName);
    currentThemeRef.current = selectedTheme;
    setCurrentTheme(selectedTheme);
    applyTheme(selectedTheme);
    storeTheme(selectedTheme.name);
  };

  const handleFontChange = (fontName: string) => {
    const selectedFont = getFont(fontName);
    currentFontRef.current = selectedFont;
    setCurrentFont(selectedFont);
    applyFont(selectedFont);
    storeFont(selectedFont.name);
  };

  const handleContinue = () => {
    applyTheme(currentTheme);
    applyFont(currentFont);
    storeTheme(currentTheme.name);
    storeFont(currentFont.name);
    setOpen(false);
    router.push("/homepage");
  };

  const chooseRandom = <T extends { name: string }>(
    items: T[],
    currentName?: string
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

  const handleChooseForMe = async () => {
    if (choosing) {
      return;
    }

    setChoosing(true);

    const nextTheme = chooseRandom(
      themes.length > 0 ? themes : getThemes(),
      currentTheme.name
    );
    const nextFont = chooseRandom(fonts.length > 0 ? fonts : getFonts(), currentFont.name);

    currentThemeRef.current = nextTheme;
    currentFontRef.current = nextFont;
    setCurrentTheme(nextTheme);
    setCurrentFont(nextFont);
    setPattern(nextTheme.background_pattern);
    applyTheme(nextTheme);
    applyFont(nextFont);
    storeTheme(nextTheme.name);
    storeFont(nextFont.name);

    await Promise.all([
      waitForFontReady(),
      new Promise((resolve) => window.setTimeout(resolve, 450)),
    ]);

    setChoosing(false);
    setOpen(false);
    router.push("/homepage");
  };

  const handleThemeHover = (theme: Theme) => {
    setPreviewTheme(theme);
    setPattern(theme.background_pattern);
    applyTheme(theme, false);
  };

  const handleThemeHoverEnd = () => {
    setPreviewTheme(null);
    setPattern("");
    applyTheme(currentThemeRef.current, false);
  };

  const handleFontHover = (font: Font) => {
    applyFont(font, false);
  };

  const handleFontHoverEnd = () => {
    applyFont(currentFontRef.current, false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-dvh w-dvw flex-col items-center justify-center overflow-y-auto bg-cover bg-no-repeat p-3 backdrop-blur-lg app-scroll sm:p-5 ${
        open ? "" : "hidden"
      }`}
      style={{
        backgroundColor: visibleTheme?.background,
        backgroundImage: pattern || visibleTheme?.background_pattern,
      }}
    >
      <div
        className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border-[2px] bg-black/10 shadow-2xl backdrop-blur-md sm:max-h-[calc(100dvh-2.5rem)]"
        style={{
          borderColor: visibleTheme?.secondaryColor,
        }}
      >
        <div className="border-b-2 border-[var(--secondary)] bg-black/10 px-4 py-4 sm:px-6 sm:py-5">
          <p
            className="text-xs font-black uppercase opacity-80 sm:text-sm"
            style={{
              color: visibleTheme?.foreground,
            }}
          >
            First things first
          </p>
          <h1
            className="brand-type mt-1 text-balance text-3xl font-black leading-none theme-shadow sm:text-5xl md:text-6xl"
            style={{
              color: visibleTheme?.foreground,
            }}
          >
            Customize your Experience
          </h1>
          <h2
            className="mt-4 flex items-center gap-2 text-lg font-black sm:text-2xl"
            style={{
              color: visibleTheme?.foreground,
            }}
          >
            <RiPaletteFill className="h-7 w-7 shrink-0 sm:h-9 sm:w-9" />
            Choose a Theme and Font
          </h2>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-3 app-scroll sm:p-5">
          <div className="grid min-h-0 gap-4 lg:grid-cols-2">
            <section className="min-w-0">
              <h3
                className="mb-3 flex items-center gap-2 text-base font-black uppercase sm:text-lg"
                style={{ color: visibleTheme?.foreground }}
              >
                <RiPaletteFill className="h-5 w-5 shrink-0" />
                Theme
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {themes.map((theme) => (
                  <ThemeButton
                    key={theme.name}
                    theme={theme}
                    active={currentTheme?.name === theme.name}
                    onClick={() => handleThemeChange(theme.name)}
                    onMouseEnter={() => handleThemeHover(theme)}
                    onMouseLeave={handleThemeHoverEnd}
                  />
                ))}
              </div>
            </section>
            <section className="min-w-0">
              <h3
                className="mb-3 flex items-center gap-2 text-base font-black uppercase sm:text-lg"
                style={{ color: visibleTheme?.foreground }}
              >
                <FaFont className="h-5 w-5 shrink-0" />
                Font
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {fonts.map((font) => (
                  <FontButton
                    key={font.name}
                    font={font}
                    active={currentFont?.name === font.name}
                    onClick={() => handleFontChange(font.name)}
                    onMouseEnter={() => handleFontHover(font)}
                    onMouseLeave={handleFontHoverEnd}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 border-t-2 border-[var(--secondary)] bg-black/10 px-4 py-3 sm:px-6">
          <button
            type="button"
            className="tool-card flex min-w-36 items-center justify-center gap-2 rounded-lg border border-[var(--secondary)] px-3 py-2 text-sm font-black transition hover:-translate-y-0.5 active:scale-95 disabled:cursor-wait disabled:opacity-80"
            onClick={() => void handleChooseForMe()}
            disabled={choosing}
          >
            {choosing ? (
              <BiLoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <FaRandom className="h-4 w-4" />
            )}
            <span>{choosing ? "Choosing..." : "Choose for me"}</span>
          </button>
          <button
            type="button"
            className="action-primary min-w-32"
            onClick={handleContinue}
            disabled={choosing}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemePicker;
