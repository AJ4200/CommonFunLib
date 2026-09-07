"use client";

import { useEffect, useState } from "react";
import { FaCog, FaCompass, FaExchangeAlt, FaLock, FaTools } from "react-icons/fa";
import { commonTools } from "@/lib/commonTools";
import { converterTools, generatorTools, hashingTools } from "@/lib/utilityTools";

type SplashCategory = {
  icon: React.ReactNode;
  label: string;
  detail: string;
  tools: string[];
};

const categories: SplashCategory[] = [
  { icon: <FaCompass />, label: "Overview", detail: "The full CommonFunLib catalog", tools: ["Functions", "Generators", "Converters", "Hashing"] },
  { icon: <FaCog />, label: "Functions", detail: `${commonTools.length} everyday checks and helpers`, tools: commonTools.map((tool) => tool.label) },
  { icon: <FaTools />, label: "Generators", detail: `${generatorTools.length} values, IDs, QR codes, and file keys`, tools: generatorTools.map((tool) => tool.label) },
  { icon: <FaExchangeAlt />, label: "Converters", detail: `${converterTools.length} unit and data conversions`, tools: converterTools.map((tool) => tool.label) },
  { icon: <FaLock />, label: "Hashing", detail: `${hashingTools.length} digests, encoders, and signatures`, tools: hashingTools.map((tool) => tool.label) },
];

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [closing, setClosing] = useState(false);
  const [fontName, setFontName] = useState("Nunito");
  const [themeName, setThemeName] = useState("Classic");

  useEffect(() => {
    setFontName(document.documentElement.dataset.font || "Nunito");
    setThemeName(document.documentElement.dataset.theme || "Classic");
    const closeTimer = window.setTimeout(() => setClosing(true), 1600);
    const doneTimer = window.setTimeout(onDone, 1950);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash-screen ${closing ? "splash-screen--closing" : ""}`}>
      <div className="splash-screen__noise" />
      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-5 py-8 sm:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.32em] opacity-75">{themeName} / {fontName}</p>
            <h1 className="brand-type text-5xl font-black leading-none sm:text-8xl">CommonFunLib</h1>
            <p className="mt-3 max-w-xl text-sm font-bold leading-6 opacity-85 sm:text-lg">The utility catalog is warming up. Every category, every tiny helper, ready to play.</p>
          </div>
          <span className="rounded-full border border-[var(--secondary)] px-3 py-2 text-xs font-black uppercase tracking-[0.18em]">npm + API + web</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <article key={category.label} className="splash-category" style={{ animationDelay: `${index * 90}ms` }}>
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="splash-category__icon">{category.icon}</span>
                <span className="text-[0.65rem] font-black opacity-60">0{index + 1}</span>
              </div>
              <h2 className="brand-type text-xl font-black">{category.label}</h2>
              <p className="mt-1 min-h-10 text-xs font-bold leading-5 opacity-75">{category.detail}</p>
              <div className="mt-4 flex max-h-32 flex-wrap content-start gap-1.5 overflow-hidden">
                {category.tools.map((tool) => <span key={tool} className="splash-chip">{tool}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] opacity-70">
          <span className="splash-progress" />
          Loading the whole catalog
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
