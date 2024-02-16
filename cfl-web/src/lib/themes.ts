import Theme from "@/models/Theme";
import { lighten } from "@/utils/utils";

export const getTheme = (themeName: string): Theme => {
  const themeMap: Record<string, Theme> = {
    Classic: {
      primaryColor: "#A9A9A9",
      secondaryColor: "#00ff00",
      foreground: "#000000",
      background: "#ffffff",
      background_pattern: ""
    },
    Vanilla: {
      primaryColor: "#FAD02E",
      secondaryColor: "#FFD89B",
      foreground: "#000000",
      background: "#FFFFFF",
      background_pattern: ""
    },
    Cherry: {
      primaryColor: "#C81D11",
      secondaryColor: "#FEC8D8",
      foreground: "#FFFFFF",
      background: "#4A0F0A",
      background_pattern: ""
    },
    Blokz: {
      primaryColor: "#3B78FF",
      secondaryColor: "#FFEE4A",
      foreground: "#FFFFFF",
      background: "#000000",
      background_pattern: ""
    },
  };


  return themeMap[themeName] || themeMap.Classic;
};
