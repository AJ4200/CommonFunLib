import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return <footer {...props}>Footer</footer>;
};
export default Footer;
