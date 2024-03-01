import Logo from "@/icons/Logo";
import { getCurrentTheme } from "@/lib/utils";
import Theme from "@/models/Theme";
import React, { useEffect, useState } from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>();

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
  }, []);

  return (
    <header
      style={{
        backgroundColor: currentTheme?.background,
        backgroundImage: currentTheme?.background_pattern,
      }}
      className="w-full top-0 m-2 h-16 rounded-lg"
      {...props}
    >
      <h1 className="h-[3.5rem] flex text-4xl font-bold items-center">
        <Logo />
        CommonFunLib
      </h1>
    </header>
  );
};
export default Header;
