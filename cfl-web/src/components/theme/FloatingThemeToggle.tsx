import React, { useEffect, useState } from "react";
import { RiPaletteFill } from "react-icons/ri";
import { getCurrentTheme } from "@/lib/utils";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

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
    ]);
    setCurrentTheme(getTheme(getStoredTheme() as string));
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
    }, 5000);
  };

  return (
    <div {...props} className="">
      <Drawer
        onClose={() => {
          setThemeApplied(false);
        }}
      >
        <DrawerTrigger>
          <RiPaletteFill
            className="rounded-xl ml-1 mt-1 p-2 w-12 h-12 transition-transform active:scale-75 border border-[var(--secondary)]"
            style={{
              color: currentTheme?.foreground,
              backgroundColor: currentTheme?.background,
              backgroundImage: currentTheme?.background_pattern,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
        </DrawerTrigger>

        <DrawerContent className="backdrop-blur-md shadow-2xl border-[var(--secondary)]">
          <div className="m-2" />
          <Card
            className="shadow-inner border-[var(--secondary)] m-4"
            style={{
              background: getCurrentTheme()?.background,
              backgroundImage: pattern,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <CardHeader>
              <CardTitle>Change Theme</CardTitle>
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
