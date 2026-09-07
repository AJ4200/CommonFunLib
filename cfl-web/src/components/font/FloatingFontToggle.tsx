import React, { useEffect, useRef, useState } from "react";
import Font from "@/models/Font";
import Theme from "@/models/Theme";
import { getFonts } from "@/lib/fonts";
import { getTheme } from "@/lib/themes";
import {
  applyFont,
  getCurrentFont,
  storeFont,
} from "./FontManager";
import { getStoredTheme, themeChangedEvent } from "@/components/theme/ThemeManager";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { FaFont, FaRandom, FaTimes } from "react-icons/fa";
import UniversalLoader from "@/components/ui/UniversalLoader";
import UniversalTooltip from "@/components/ui/UniversalTooltip";
import FontButton from "./FontButton";

interface FloatingFontToggleProps {}

const availableFonts = getFonts();

const FloatingFontToggle: React.FC<FloatingFontToggleProps> = ({ ...props }) => {
  const [fonts] = useState<Font[]>(availableFonts);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentFont, setCurrentFont] = useState<Font>();
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>
    getTheme(getStoredTheme() ?? "Classic")
  );
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentFontRef = useRef<Font>(getCurrentFont());

  useEffect(() => {
    const activeFont = getCurrentFont();
    currentFontRef.current = activeFont;
    setCurrentFont(activeFont);
    applyFont(activeFont);

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

    };
  }, []);

  useEffect(() => {
    const handleThemeApplied = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;

      if (nextTheme) {
        setCurrentTheme(nextTheme);
      }
    };

    window.addEventListener(themeChangedEvent, handleThemeApplied);

    return () => {
      window.removeEventListener(themeChangedEvent, handleThemeApplied);
    };
  }, []);

  const handleFontHover = (font: Font) => {
    applyFont(font, false);
  };

  const handleFontHoverEnd = () => {
    applyFont(currentFontRef.current, false);
  };

  const handleFontChange = (font: Font) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setLoading(true);
    currentFontRef.current = font;
    setCurrentFont(font);
    applyFont(font);
    storeFont(font.name);

    closeTimerRef.current = setTimeout(() => {
      setLoading(false);
      setOpen(false);
      closeTimerRef.current = null;
    }, 350);
  };

  const handleRandomFont = () => {
    const options = fonts.filter((font) => font.name !== currentFontRef.current.name);
    const pool = options.length > 0 ? options : fonts;
    const randomFont = pool[Math.floor(Math.random() * pool.length)];

    handleFontChange(randomFont);
  };

  return (
    <div className="relative" {...props}>
      <UniversalTooltip
        actionLabel="Shuffle"
        onAction={handleRandomFont}
      >
        <Drawer
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);

          if (!nextOpen) {
            if (closeTimerRef.current) {
              clearTimeout(closeTimerRef.current);
              closeTimerRef.current = null;
            }

            setLoading(false);
            applyFont(currentFontRef.current, false);
          }
        }}
        direction="bottom"
        shouldScaleBackground={false}
      >
        <DrawerTrigger asChild>
          <button
            className="tool-card grid h-9 w-9 place-items-center rounded-lg border border-[var(--secondary)] text-[0.68rem] font-black transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            <span
              className="grid h-6 w-6 place-items-center rounded-md bg-cover bg-center leading-none"
              style={{
                color: currentTheme.foreground,
                backgroundColor: currentTheme.background,
                backgroundImage: currentTheme.background_pattern,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                fontFamily: currentFont
                  ? `var(${currentFont.cssVariable}), ${currentFont.fallback}`
                  : "var(--font-sans), system-ui, sans-serif",
              }}
            >
              <FaFont className="h-3.5 w-3.5" />
            </span>
          </button>
        </DrawerTrigger>

        <DrawerContent className="fixed inset-x-0 bottom-0 top-auto z-50 mt-0 h-[82dvh] w-full rounded-t-2xl border-0 bg-transparent p-0 outline-none sm:h-[78dvh] [&>div:first-child]:hidden">
          <div className="chrome-panel flex h-full w-full overflow-hidden rounded-t-2xl border-t-2 border-[var(--secondary)]">
            <Card className="glass-panel flex h-full w-full flex-col overflow-hidden rounded-t-2xl border-0 shadow-2xl">
              <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 border-b-2 border-[var(--secondary)] bg-black/10">
                <div className="min-w-0">
                  <CardTitle className="brand-type text-2xl font-black">
                    Change Font
                  </CardTitle>
                  <CardDescription>
                    Pick a goofy font for the whole interface.
                  </CardDescription>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    className="icon-action"
                    title="Pick a random font"
                    onClick={handleRandomFont}
                    disabled={loading}
                  >
                    <FaRandom />
                  </button>
                  <DrawerClose className="icon-action" title="Close font picker">
                    <FaTimes />
                  </DrawerClose>
                </div>
              </CardHeader>
              <CardContent className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-4 app-scroll sm:px-6">
                <div className="mx-auto grid w-full max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {fonts.map((font) => (
                    <FontButton
                      key={font.name}
                      font={font}
                      active={currentFont?.name === font.name}
                      onClick={() => handleFontChange(font)}
                      onMouseEnter={() => handleFontHover(font)}
                      onMouseLeave={handleFontHoverEnd}
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="min-h-14 border-t-2 border-[var(--secondary)] bg-black/10">
                {loading ? (
                  <span className="flex items-center space-x-2 font-semibold">
                    <UniversalLoader label="Applying font" size="sm" />
                  </span>
                ) : null}
              </CardFooter>
            </Card>
          </div>
        </DrawerContent>
        </Drawer>
      </UniversalTooltip>
    </div>
  );
};

export default FloatingFontToggle;
