import React, { useState } from "react";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Main from "@/layout/Main";
import { getCurrentTheme } from "@/lib/utils";
import Theme from "@/models/Theme";
import { useEffect } from "react";
import IconNav from "@/layout/IconNav";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>();
  const [activeIconLabel, setActiveIconLabel] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
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
        <IconNav setActiveIconLabel={setActiveIconLabel} />
        <Main>{activeIconLabel ? activeIconLabel : "Main"}</Main>
      </div>
      <Footer />
    </main>
  );
};

export default Homepage;
