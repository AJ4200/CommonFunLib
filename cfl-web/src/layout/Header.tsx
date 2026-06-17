import Logo from "@/icons/Logo";
import React from "react";
import { FaBolt, FaServer } from "react-icons/fa";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  return (
    <header
      className="chrome-panel h-full w-full rounded-lg border-2 border-[var(--secondary)]"
      {...props}
    >
      <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-4">
        <h1 className="brand-type flex min-w-0 items-center text-xl font-black theme-shadow sm:text-3xl">
          <Logo className="h-11 w-11 shrink-0 sm:h-16 sm:w-16" />
          <span className="truncate">CommonFunLib</span>
        </h1>
        <div className="ml-auto hidden items-center gap-2 rounded-lg border border-[var(--secondary)] bg-black/10 px-3 py-2 text-sm font-black md:flex">
          <FaBolt className="text-[var(--secondary)]" />
          Live workbench
        </div>
        <div className="hidden items-center gap-2 rounded-lg border border-[var(--secondary)] bg-black/10 px-3 py-2 text-sm font-bold lg:flex">
          <FaServer className="text-[var(--secondary)]" />
          API :3001
        </div>
      </div>
    </header>
  );
};
export default Header;
