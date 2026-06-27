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

export default function Homepage() {
  const [activeIconContent, setActiveIconContent] =
    useState<React.ReactNode | null>(null);

  useEffect(() => {
    const theme = getTheme(getStoredTheme() ?? "Classic");
    applyTheme(theme);
    applyFont(getCurrentFont());
  }, []);

  return (
    <main
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: "var(--background-image)",
      }}
      className="app-shell grid h-dvh w-dvw grid-rows-[3.75rem_minmax(0,1fr)_3.25rem] gap-1.5 overflow-hidden p-1.5 sm:grid-rows-[4.5rem_minmax(0,1fr)_3.75rem] sm:gap-2 sm:p-2"
    >
      <Header />
      <div className="flex min-h-0 w-full gap-2 overflow-hidden">
        <IconNav setActiveIconContent={setActiveIconContent} />
        <Main>{activeIconContent ? activeIconContent : <MainPage />}</Main>
      </div>
      <Footer />
    </main>
  );
}
