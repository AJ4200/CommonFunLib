import React, { useEffect, useRef, useState } from "react";
import { RiPaletteFill } from "react-icons/ri";
import Theme from "@/models/Theme";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import ThemeButton from "./ThemeButton";
import { getTheme, getThemes } from "@/lib/themes";
import {
  applyTheme,
  getStoredTheme,
  storeTheme,
  themeChangedEvent,
} from "./ThemeManager";
import { BiLoaderCircle } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer";

interface FloatingThemeToggleProps {}

const availableThemes = getThemes();

const FloatingThemeToggle: React.FC<FloatingThemeToggleProps> = ({
  ...props
}) => {
  const [pattern, setPattern] = useState("");
  const [themes] = useState<Theme[]>(availableThemes);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noticeReadyRef = useRef(false);
  const currentThemeRef = useRef<Theme>(getTheme(getStoredTheme() ?? "Classic"));
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const activeTheme = getTheme(getStoredTheme() ?? "Classic");
    currentThemeRef.current = activeTheme;
    setCurrentTheme(activeTheme);

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
    const readyTimer = setTimeout(() => {
      noticeReadyRef.current = true;
    }, 500);

    const handleThemeApplied = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;

      if (!nextTheme) {
        return;
      }

      currentThemeRef.current = nextTheme;
      setCurrentTheme(nextTheme);
      if (!noticeReadyRef.current) {
        return;
      }

      setNotice(`Theme: ${nextTheme.name}`);

      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current);
      }

      noticeTimerRef.current = setTimeout(() => {
        setNotice(null);
        noticeTimerRef.current = null;
      }, 1800);
    };

    window.addEventListener(themeChangedEvent, handleThemeApplied);

    return () => {
      clearTimeout(readyTimer);
      window.removeEventListener(themeChangedEvent, handleThemeApplied);
    };
  }, []);

  const handleThemeHover = (theme: Theme) => {
    setPattern(theme.background_pattern);
    applyTheme(theme, false);
  };

  const handleThemeHoverEnd = () => {
    setPattern("");
    applyTheme(currentThemeRef.current, false);
  };

  const handleThemeChange = (themeName: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setLoading(true);
    const selectedTheme = getTheme(themeName);
    currentThemeRef.current = selectedTheme;
    setCurrentTheme(selectedTheme);
    applyTheme(selectedTheme);
    storeTheme(selectedTheme.name);

    closeTimerRef.current = setTimeout(() => {
      setLoading(false);
      setOpen(false);
      closeTimerRef.current = null;
    }, 350);
  };

  return (
    <div className="relative" {...props}>
      {notice ? (
        <span className="pointer-events-none absolute bottom-[calc(100%+0.35rem)] left-1/2 z-20 max-w-36 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--secondary)] bg-[var(--background)] px-1.5 py-0.5 text-[0.62rem] font-black text-[var(--foreground)] shadow-lg">
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
            setPattern("");
            applyTheme(currentThemeRef.current, false);
          }
        }}
        direction="bottom"
        shouldScaleBackground={false}
      >
        <DrawerTrigger asChild>
          <button
            className="tool-card grid h-11 w-11 place-items-center rounded-lg border border-[var(--secondary)] transition-transform hover:-translate-y-0.5 active:scale-95"
            title="Open theme picker"
          >
          <RiPaletteFill
            className="h-8 w-8 rounded-md p-1"
            style={{
              color: currentTheme?.foreground,
              backgroundColor: currentTheme?.background,
              backgroundImage: currentTheme?.background_pattern,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          </button>
        </DrawerTrigger>

        <DrawerContent className="fixed inset-x-0 bottom-0 top-auto z-50 mt-0 h-[82dvh] w-full rounded-t-2xl border-0 bg-transparent p-0 outline-none sm:h-[78dvh] [&>div:first-child]:hidden">
          <div className="chrome-panel flex h-full w-full overflow-hidden rounded-t-2xl border-t-2 border-[var(--secondary)]">
            <Card
              className="glass-panel flex h-full w-full flex-col overflow-hidden rounded-t-2xl border-0 shadow-2xl"
              style={{
                backgroundImage: pattern,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 border-b-2 border-[var(--secondary)] bg-black/10">
                <div>
                  <CardTitle className="brand-type text-2xl font-black">Change Theme</CardTitle>
                  <CardDescription>
                    Click on desired theme to apply.
                  </CardDescription>
                </div>
                <DrawerClose className="icon-action shrink-0" title="Close theme picker">
                  <FaTimes />
                </DrawerClose>
              </CardHeader>
              <CardContent className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-4 app-scroll sm:px-6">
                <div className="mx-auto grid w-full max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
              </CardContent>
              <CardFooter className="min-h-14 border-t-2 border-[var(--secondary)] bg-black/10">
                {loading ? (
                  <a className="flex items-center space-x-2 font-semibold">
                    <BiLoaderCircle size={23} />
                    Applying theme...
                  </a>
                ) : null}
              </CardFooter>
            </Card>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FloatingThemeToggle;
