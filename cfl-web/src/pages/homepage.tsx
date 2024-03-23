import React from "react";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Main from "@/layout/Main";
import FloatingThemeToggle from "@/components/theme/FloatingThemeToggle";
import { getCurrentTheme } from "@/lib/utils";
import Theme from "@/models/Theme";
import { useEffect, useState } from "react";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>();

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
  }, [currentTheme]);

  return (
    <main
      style={{
        backgroundColor: currentTheme?.background,
        backgroundImage: "var(--background-image)",
      }}
      className="bg-[]"
    >
      <Header />
      <Main>Main</Main>
      <Footer />
      <FloatingThemeToggle />
    </main>
  );
};
export default Homepage;
