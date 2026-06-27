import Font from "@/models/Font";

export const fontNames = [
  "Nunito",
  "Bangers",
  "Chewy",
  "Comic Neue",
  "Freckle Face",
  "Kablammo",
  "Monoton",
  "Rubik Bubbles",
  "Rubik Glitch",
  "Silkscreen",
] as const;

const fonts: Record<string, Font> = {
  Nunito: {
    name: "Nunito",
    cssVariable: "--font-nunito",
    fallback: "system-ui, sans-serif",
    vibe: "Default friendly utility mode.",
    sample: "CommonFunLib keeps it comfy.",
  },
  Bangers: {
    name: "Bangers",
    cssVariable: "--font-bangers",
    fallback: "Impact, fantasy",
    vibe: "Comic book button smashing.",
    sample: "Zap! Hash that string!",
  },
  Chewy: {
    name: "Chewy",
    cssVariable: "--font-chewy",
    fallback: "cursive",
    vibe: "Soft marshmallow chaos.",
    sample: "Squish the payload gently.",
  },
  "Comic Neue": {
    name: "Comic Neue",
    cssVariable: "--font-comic-neue",
    fallback: "cursive",
    vibe: "Goofy, but still house-trained.",
    sample: "Utilities, but make it doodly.",
  },
  "Freckle Face": {
    name: "Freckle Face",
    cssVariable: "--font-freckle-face",
    fallback: "cursive",
    vibe: "Lunchbox sticker energy.",
    sample: "Generate a name, maybe three.",
  },
  Kablammo: {
    name: "Kablammo",
    cssVariable: "--font-kablammo",
    fallback: "fantasy",
    vibe: "Maximum cartoon voltage.",
    sample: "KABLAMMO! API online!",
  },
  Monoton: {
    name: "Monoton",
    cssVariable: "--font-monoton",
    fallback: "fantasy",
    vibe: "Neon arcade marquee.",
    sample: "Convert all the things.",
  },
  "Rubik Bubbles": {
    name: "Rubik Bubbles",
    cssVariable: "--font-rubik-bubbles",
    fallback: "fantasy",
    vibe: "Inflatable pool float letters.",
    sample: "Bubble sort? No thanks.",
  },
  "Rubik Glitch": {
    name: "Rubik Glitch",
    cssVariable: "--font-rubik-glitch",
    fallback: "fantasy",
    vibe: "Very legal terminal incident.",
    sample: "404: boring font not found.",
  },
  Silkscreen: {
    name: "Silkscreen",
    cssVariable: "--font-silkscreen",
    fallback: "monospace",
    vibe: "Tiny pixel dashboard.",
    sample: "STATUS: ABSOLUTELY FINE",
  },
};

export const getFont = (fontName: string): Font => fonts[fontName] || fonts.Nunito;

export const getFonts = () => fontNames.map((name) => getFont(name));
