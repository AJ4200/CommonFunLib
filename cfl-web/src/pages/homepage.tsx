import React from "react";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Main from "@/layout/Main";
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
      className="flex justify-center flex-col"
    >
      <Header />
      <Main>Main</Main>
      <Footer />
    </main>
  );
};
export default Homepage;
