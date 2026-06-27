import React, { useEffect, useRef, useState } from "react";
import Font from "@/models/Font";
import Theme from "@/models/Theme";
import { getFonts } from "@/lib/fonts";
import { getTheme } from "@/lib/themes";
import {
  applyFont,
  fontChangedEvent,
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
import { BiLoaderCircle } from "react-icons/bi";
import { FaFont, FaTimes } from "react-icons/fa";
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
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noticeReadyRef = useRef(false);
  const currentFontRef = useRef<Font>(getCurrentFont());
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const activeFont = getCurrentFont();
    currentFontRef.current = activeFont;
    setCurrentFont(activeFont);
    applyFont(activeFont);

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current);
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

  useEffect(() => {
    const readyTimer = setTimeout(() => {
      noticeReadyRef.current = true;
    }, 500);

    const handleFontApplied = (event: Event) => {
      const nextFont = (event as CustomEvent<Font>).detail;

      if (!nextFont) {
        return;
      }

      currentFontRef.current = nextFont;
      setCurrentFont(nextFont);
      if (!noticeReadyRef.current) {
        return;
      }

      setNotice(`Font: ${nextFont.name}`);

      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current);
      }

      noticeTimerRef.current = setTimeout(() => {
        setNotice(null);
        noticeTimerRef.current = null;
      }, 1800);
    };

    window.addEventListener(fontChangedEvent, handleFontApplied);

    return () => {
      clearTimeout(readyTimer);
      window.removeEventListener(fontChangedEvent, handleFontApplied);
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

  return (
    <div className="relative" {...props}>
      {notice ? (
        <span className="pointer-events-none absolute bottom-[calc(100%+0.35rem)] left-1/2 z-20 max-w-32 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--secondary)] bg-[var(--background)] px-1.5 py-0.5 text-[0.62rem] font-black text-[var(--foreground)] shadow-lg">
          {notice}
        </span>
      ) : null}
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
            title="Open font picker"
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
                <DrawerClose className="icon-action shrink-0" title="Close font picker">
                  <FaTimes />
                </DrawerClose>
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
                    <BiLoaderCircle size={23} />
                    <span>Applying font...</span>
                  </span>
                ) : null}
              </CardFooter>
            </Card>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FloatingFontToggle;
