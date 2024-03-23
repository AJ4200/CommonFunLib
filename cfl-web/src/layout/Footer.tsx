import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 w-full m-2 h-16 rounded-xl bg-[var(--primary)] border-[var(--secondary)] border-2 shadow-2xl "
      style={{ maxWidth: "calc(100% - 1rem)", margin: "0 auto 0.5rem" }}
      {...props}
    >
      Footer
    </footer>
  );
};
export default Footer;
