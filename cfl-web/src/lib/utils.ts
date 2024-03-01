import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getTheme } from "./themes";
import { getStoredTheme } from "@/components/theme/ThemeManager";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Function to lighten a color
export const lighten = (color: string, amount: number): string => {
  const colorCode = parseInt(color.replace("#", ""), 16);
  const red = (colorCode >> 16) + amount;
  const green = ((colorCode >> 8) & 0xff) + amount;
  const blue = (colorCode & 0xff) + amount;
  const newColor = (blue | (green << 8) | (red << 16)).toString(16);
  return "#" + newColor.padStart(6, "0");
};

export const getCurrentTheme = () => {
  return getTheme(getStoredTheme.toString());
};
