import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Main from "@/layout/Main";
import React from "react";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = ({ ...prop }) => {
  return (
    <main>
      <Header />
      <Main></Main>
      <Footer />
    </main>
  );
};
export default Homepage;
