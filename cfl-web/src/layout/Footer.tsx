import FloatingThemeToggle from "@/components/theme/FloatingThemeToggle";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return (
    <footer
      className="w-full m-2 h-16 rounded-xl bg-[var(--primary)] border-[var(--secondary)] border-2 shadow-2xl "
      style={{ maxWidth: "calc(100% - 1rem)", margin: "0 auto 0.5rem" }}
      {...props}
    >
      <FloatingThemeToggle />
    </footer>
  );
};
export default Footer;
