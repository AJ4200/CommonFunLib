"use client";

import { useEffect, useState } from "react";
import UniversalLoader from "@/components/ui/UniversalLoader";

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const closeTimer = window.setTimeout(() => setClosing(true), 3200);
    const doneTimer = window.setTimeout(onDone, 3900);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash-screen ${closing ? "splash-screen--closing" : ""}`}>
      <div className="splash-screen__noise" />
      <div className="relative z-10 flex min-h-full items-center justify-center px-5 py-8">
        <div className="text-center">
          <h1 className="brand-type text-5xl font-black leading-none theme-shadow sm:text-7xl">CommonFunLib</h1>
          <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] opacity-70">Loading workspace</p>
          <UniversalLoader label="" size="md" className="mt-7 justify-center" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
