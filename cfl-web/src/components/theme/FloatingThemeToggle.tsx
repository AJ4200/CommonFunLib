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
import { getTheme } from "@/lib/themes";
import { applyTheme, getStoredTheme, storeTheme } from "./ThemeManager";
import { BiLoaderCircle } from "react-icons/bi";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer";

interface FloatingThemeToggleProps {}

const FloatingThemeToggle: React.FC<FloatingThemeToggleProps> = ({
  ...props
}) => {
  const [pattern, setPattern] = useState("");
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(false);
  const [themeApplied, setThemeApplied] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>();

  useEffect(() => {
    setThemes([
      getTheme("Classic"),
      getTheme("Vanilla"),
      getTheme("Cherry"),
      getTheme("Emerald"),
      getTheme("Midnight"),
      getTheme("Sunset"),
    ]);
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

        <DrawerContent className="chrome-panel left-auto right-0 top-0 bottom-auto inset-x-auto mt-0 h-dvh w-full max-w-md rounded-l-lg rounded-t-none border-l-2 border-[var(--secondary)] backdrop-blur-md">
          <Card
            className="m-4 max-h-[calc(100dvh-2rem)] overflow-y-auto border-[var(--secondary)] shadow-inner app-scroll"
            style={{
              background: currentTheme?.background,
              backgroundImage: pattern,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <CardHeader>
              <CardTitle className="brand-type text-xl font-black">Change Theme</CardTitle>
              <CardDescription>
                Click on desired theme to apply.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {themes.map((theme) => (
                <ThemeButton
                  key={theme.name}
                  theme={theme}
                  onClick={() => handleThemeChange(theme.name)}
                  onMouseEnter={() =>
                    handleThemeHover(theme.background_pattern)
                  }
                />
              ))}
            </CardContent>
            <CardFooter>
              {loading ? (
                <a className="font-semibold flex space-x-2 items-center">
                  <BiLoaderCircle size={23} />
                  Applying theme...
                </a>
              ) : themeApplied ? (
                <p className="font-semibold text-sm">
                  Theme applied. Click{" "}
                  <DrawerClose className="underline">HERE!</DrawerClose> to
                  close theme picker
                </p>
              ) : null}
            </CardFooter>
          </Card>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FloatingThemeToggle;
