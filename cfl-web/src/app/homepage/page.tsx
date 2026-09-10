"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Main from "@/layout/Main";
import IconNav from "@/layout/IconNav";
import { getTheme } from "@/lib/themes";
import { applyTheme, getStoredTheme } from "@/components/theme/ThemeManager";
import { applyFont, getCurrentFont } from "@/components/font/FontManager";
import MainPage from "@/components/nasec/MainPage";
import SplashScreen from "@/components/SplashScreen";
import ApiStatusView from "@/components/ApiStatusView";
import DataPrivacyView from "@/components/DataPrivacyView";

type MainView = "overview" | "api" | "privacy";

export default function Homepage() {
  const [activeIconContent, setActiveIconContent] =
    useState<React.ReactNode | null>(null);
  const [mainView, setMainView] = useState<MainView>("overview");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const theme = getTheme(getStoredTheme() ?? "Classic");
    applyTheme(theme);
    applyFont(getCurrentFont());
  }, []);

  return (
    <>
      {showSplash ? <SplashScreen onDone={() => setShowSplash(false)} /> : null}
      <main
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: "var(--background-image)",
      }}
      className="app-shell grid h-dvh w-dvw grid-rows-[3.75rem_minmax(0,1fr)_3.25rem] gap-1.5 overflow-hidden p-1.5 sm:grid-rows-[4.5rem_minmax(0,1fr)_3.75rem] sm:gap-2 sm:p-2"
    >
      <Header onOpenApiStatus={() => setMainView("api")} />
      <div className="flex min-h-0 w-full gap-2 overflow-hidden">
        <IconNav
          setActiveIconContent={(content) => {
            setMainView("overview");
            setActiveIconContent(content);
          }}
        />
        <Main>
          {mainView === "api" ? <ApiStatusView onBack={() => setMainView("overview")} /> : mainView === "privacy" ? <DataPrivacyView onBack={() => setMainView("overview")} /> : activeIconContent ? activeIconContent : <MainPage />}
        </Main>
      </div>
      <Footer onOpenDataPrivacy={() => setMainView("privacy")} />
      </main>
    </>
  );
}
