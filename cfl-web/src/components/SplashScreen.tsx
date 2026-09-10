"use client";

import { useEffect, useState } from "react";
import UniversalLoader from "@/components/ui/UniversalLoader";
import Logo from "@/icons/Logo";

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [closing, setClosing] = useState(false);
  const [apiVersion, setApiVersion] = useState<string | null>(null);

  useEffect(() => {
    const closeTimer = window.setTimeout(() => setClosing(true), 3200);
    const doneTimer = window.setTimeout(onDone, 3900);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  useEffect(() => {
    fetch("/api/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data?.apiVersion === "string") {
          setApiVersion(data.apiVersion);
        }
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className={`splash-screen ${closing ? "splash-screen--closing" : ""}`}>
      <div className="splash-screen__noise" />
      <div className="relative z-10 flex min-h-full items-center justify-center px-5 py-8">
        <div className="text-center">
          <div className="mb-4 flex flex-col items-center">
            <Logo className="h-16 w-16 sm:h-20 sm:w-20" />
            <span className="mt-1 text-[0.62rem] font-black tracking-[0.12em] opacity-75">v{apiVersion ?? "--"}</span>
          </div>
          <h1 className="brand-type text-5xl font-black leading-none theme-shadow sm:text-7xl">CommonFunLib</h1>
          <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] opacity-70">Opening the catalog</p>
          <UniversalLoader label="" size="md" className="mt-7 justify-center" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
