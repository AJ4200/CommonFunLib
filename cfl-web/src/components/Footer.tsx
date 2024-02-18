import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return (
    <footer className="fixed bottom-0" {...props}>
      Footer
    </footer>
  );
};
export default Footer;
