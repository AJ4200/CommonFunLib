"use client";

import { useState } from "react";
import { FaMagic, FaRandom } from "react-icons/fa";
import Font from "@/models/Font";
import Theme from "@/models/Theme";
import { getFonts } from "@/lib/fonts";
import { getThemes } from "@/lib/themes";
import { applyFont, storeFont } from "@/components/font/FontManager";
import { applyTheme, storeTheme } from "@/components/theme/ThemeManager";

type Combo = {
  font: Font;
  theme: Theme;
};

const fonts = getFonts();
const themes = getThemes();

const comboSeeds = [
  [2, 13],
  [11, 41],
  [24, 72],
  [37, 9],
] as const;

const seededCombos = (): Combo[] =>
  comboSeeds.map(([fontIndex, themeIndex]) => ({
    font: fonts[fontIndex % fonts.length],
    theme: themes[themeIndex % themes.length],
  }));

const randomItem = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const randomCombos = () => {
  const seen = new Set<string>();
  const combos: Combo[] = [];

  while (combos.length < 4 && seen.size < fonts.length * themes.length) {
    const font = randomItem(fonts);
    const theme = randomItem(themes);
    const key = `${font.name}:${theme.name}`;

    if (!seen.has(key)) {
      seen.add(key);
      combos.push({ font, theme });
    }
  }

  return combos;
};

const RandomizerShowcase = () => {
  const [combos, setCombos] = useState<Combo[]>(seededCombos);

  const applyCombo = ({ font, theme }: Combo) => {
    applyTheme(theme);
    storeTheme(theme.name);
    applyFont(font);
    storeFont(font.name);
  };

  return (
    <section className="mx-auto mt-4 max-w-6xl min-w-0 sm:mt-6">
      <div className="tool-card min-w-0 rounded-2xl border border-[var(--secondary)] p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex min-w-0 items-center gap-3 text-lg font-black sm:text-xl">
              <FaMagic className="shrink-0 text-[var(--secondary)]" />
              <h2 className="brand-type min-w-0 truncate">Experience randomizer</h2>
            </div>
            <p className="max-w-3xl text-sm font-semibold leading-6 opacity-85 sm:text-base">
              {themes.length} themes x {fonts.length} fonts ={" "}
              {(themes.length * fonts.length).toLocaleString()} possible looks.
            </p>
          </div>
          <button
            type="button"
            className="action-primary flex shrink-0 items-center gap-2"
            onClick={() => setCombos(randomCombos())}
          >
            <FaRandom />
            Reroll previews
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {combos.map((combo) => (
            <button
              key={`${combo.theme.name}-${combo.font.name}`}
              type="button"
              className="min-w-0 overflow-hidden rounded-xl border border-[var(--secondary)] text-left shadow-lg transition hover:-translate-y-1 active:scale-[0.99]"
              style={{
                color: combo.theme.foreground,
                backgroundColor: combo.theme.background,
                backgroundImage: combo.theme.background_pattern,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                fontFamily: `var(${combo.font.cssVariable}), ${combo.font.fallback}`,
              }}
              onClick={() => applyCombo(combo)}
              title={`Apply ${combo.theme.name} with ${combo.font.name}`}
            >
              <span className="block bg-black/20 p-4 backdrop-blur-[1px]">
                <span className="block truncate text-[0.65rem] font-black uppercase opacity-80">
                  {combo.theme.name}
                </span>
                <span className="mt-2 block truncate text-2xl font-black leading-none">
                  {combo.font.name}
                </span>
                <span className="mt-4 block overflow-wrap-anywhere rounded-lg border border-white/25 bg-black/20 px-3 py-2 text-sm font-bold leading-5">
                  {combo.font.sample}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RandomizerShowcase;
