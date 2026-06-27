import Font from "@/models/Font";
import { getFont } from "@/lib/fonts";

const FONT_STORAGE_KEY = "FONT";
const FONT_CHANGED_EVENT = "commonfunlib:font-change";

const toFontFamily = (font: Font) => `var(${font.cssVariable}), ${font.fallback}`;

export const applyFont = (font: Font) => {
  if (typeof document === "undefined") {
    return;
  }

  const fontFamily = toFontFamily(font);
  const root = document.documentElement;

  root.style.setProperty("--font-sans", fontFamily);
  root.dataset.font = font.name;

  if (document.body) {
    document.body.style.setProperty("--font-sans", fontFamily);
    document.body.dataset.font = font.name;
  }

  window.dispatchEvent(new CustomEvent(FONT_CHANGED_EVENT, { detail: font }));
};

export const getStoredFont = () => {
  if (typeof sessionStorage !== "undefined") {
    return sessionStorage.getItem(FONT_STORAGE_KEY);
  }

  return null;
};

export const storeFont = (fontName: string) => {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem(FONT_STORAGE_KEY, fontName);
  }
};

export const getCurrentFont = () => getFont(getStoredFont() ?? "Nunito");

export const fontChangedEvent = FONT_CHANGED_EVENT;
