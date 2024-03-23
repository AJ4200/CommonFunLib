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
      className="fixed top-0 left-0 right-0 h-16 rounded-xl bg-[var(--primary)] border-[var(--secondary)] border-2 shadow-2xl"
      style={{ maxWidth: "calc(100% - 1rem)", margin: "0.5rem auto 0" }}
      {...props}
    >
      <h1 className="flex text-4xl font-bold items-center">
        <Logo />
        CommonFunLib
      </h1>
    </header>
  );
};
export default Header;