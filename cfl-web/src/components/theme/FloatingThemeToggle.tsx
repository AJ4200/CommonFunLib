import React, { useEffect, useState } from "react";
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
import { applyTheme, getStoredTheme, storeTheme } from "./ThemeManager";
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
  const [loading, setLoading] = useState(false);
  const [themeApplied, setThemeApplied] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>();

  useEffect(() => {
    setCurrentTheme(getTheme(getStoredTheme() ?? "Classic"));
  }, []);

  const handleThemeHover = (themePattern: string) => {
    setPattern(themePattern);
  };

  const handleThemeChange = (themeName: string) => {
    setLoading(true);
    const selectedTheme = getTheme(themeName);
    setCurrentTheme(selectedTheme);
    applyTheme(selectedTheme);
    storeTheme(selectedTheme.name);

    setTimeout(() => {
      setLoading(false);
      setThemeApplied(true);
    }, 500);
  };

  return (
    <div {...props}>
      <Drawer
        direction="bottom"
        shouldScaleBackground={false}
        onClose={() => {
          setThemeApplied(false);
        }}
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
                      onMouseEnter={() =>
                        handleThemeHover(theme.background_pattern)
                      }
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
                ) : themeApplied ? (
                  <p className="text-sm font-semibold">
                    Theme applied.
                  </p>
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
