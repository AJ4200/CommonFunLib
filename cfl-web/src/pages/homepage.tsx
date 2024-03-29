import React, { useState } from "react";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Main from "@/layout/Main";
import Theme from "@/models/Theme";
import { useEffect } from "react";
import IconNav from "@/layout/IconNav";
import { getTheme } from "@/lib/themes";
import { applyTheme, getStoredTheme } from "@/components/theme/ThemeManager";
import MainPage from "@/components/nasec/MainPage";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>();
  const [activeIconContent, setActiveIconContent] =
    useState<React.ReactNode | null>(null);

  useEffect(() => {
    setCurrentTheme(getTheme(getStoredTheme() as string));
    applyTheme(getTheme(getStoredTheme() as string))
  }, []);

  return (
    <main
      style={{
        backgroundColor: currentTheme?.background,
        backgroundImage: "var(--background-image)",
      }}
      className="flex justify-center flex-col"
    >
      <Header />
      <div
        className="w-full h-full flex space-x-2"
        style={{ maxWidth: "calc(100% - 1rem)", margin: "0.5rem auto 0.5rem" }}
      >
        <IconNav setActiveIconContent={setActiveIconContent} />
        <Main>{activeIconContent ? activeIconContent : <MainPage/>}</Main>
      </div>
      <Footer />
    </main>
  );
};

export default Homepage;
