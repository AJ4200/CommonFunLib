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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { getTheme } from "@/lib/themes";
import { applyTheme, storeTheme } from "./ThemeManager";
import { PopoverClose } from "@radix-ui/react-popover";
import { Loader } from "lucide-react";
import { BiLoaderCircle } from "react-icons/bi";

interface FloatingThemeToggleProps {}

const FloatingThemeToggle: React.FC<FloatingThemeToggleProps> = ({
  ...props
}) => {
  const [pattern, setPattern] = useState("");
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(false);
  const [themeApplied, setThemeApplied] = useState(false);

  useEffect(() => {
    setThemes([getTheme("Classic"), getTheme("Vanilla"), getTheme("Cherry")]);
  }, []);

  const handleThemeHover = (themePattern: string) => {
    setPattern(themePattern);
  };

  const handleThemeChange = (themeName: string) => {
    setLoading(true);
    const selectedTheme = getTheme(themeName);
    applyTheme(selectedTheme);
    storeTheme(selectedTheme.name);

    setTimeout(() => {
      setLoading(false);
      setThemeApplied(true);
    }, 5000); // Set loading to false after 5 seconds
  };

  return (
    <div {...props} className="fixed right-2 bottom-2">
      <Popover>
        <PopoverTrigger>
          <RiPaletteFill
            className="rounded-full p-4 w-14 h-14 transition-transform active:scale-75 "
            style={{
              color: getCurrentTheme().foreground,
              backgroundColor: getCurrentTheme().background,
              backgroundImage: getCurrentTheme().background_pattern,
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="backdrop-blur-md shadow-2xl">
          <Card
            className="shadow-inner"
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
                  <PopoverClose className="underline">HERE!</PopoverClose> to
                  close theme picker
                </p>
              ) : null}
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FloatingThemeToggle;
