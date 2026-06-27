import React, { useEffect, useRef, useState } from "react";
import Font from "@/models/Font";
import { getFonts } from "@/lib/fonts";
import {
  applyFont,
  getCurrentFont,
  storeFont,
} from "./FontManager";
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
import { FaTimes } from "react-icons/fa";
import FontButton from "./FontButton";

interface FloatingFontToggleProps {}

const availableFonts = getFonts();

const FloatingFontToggle: React.FC<FloatingFontToggleProps> = ({ ...props }) => {
  const [fonts] = useState<Font[]>(availableFonts);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentFont, setCurrentFont] = useState<Font>();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const activeFont = getCurrentFont();
    setCurrentFont(activeFont);
    applyFont(activeFont);

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleFontChange = (font: Font) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setLoading(true);
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
    <div {...props}>
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
          }
        }}
        direction="bottom"
        shouldScaleBackground={false}
      >
        <DrawerTrigger asChild>
          <button
            className="tool-card grid h-8 w-8 place-items-center rounded-md border border-[var(--secondary)] text-xs font-black transition-transform hover:-translate-y-0.5 active:scale-95 sm:h-9 sm:w-9"
            title="Open font picker"
          >
            <span
              className="grid h-5 w-5 place-items-center rounded bg-black/10 leading-none sm:h-6 sm:w-6"
              style={{
                color: "var(--foreground)",
                fontFamily: currentFont
                  ? `var(${currentFont.cssVariable}), ${currentFont.fallback}`
                  : "var(--font-sans), system-ui, sans-serif",
              }}
            >
              Ff
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
