import FloatingThemeToggle from "@/components/theme/FloatingThemeToggle";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Main from "@/layout/Main";
import React from "react";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  return (
    <main>
      <Header />
      <Main></Main>
      <Footer />
      <FloatingThemeToggle />
    </main>
  );
};
export default Homepage;
