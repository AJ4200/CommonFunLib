import React from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <section className="w-full h-full rounded-xl backdrop-blur-md border-[var(--secondary)] border-2 shadow-2xl">
      <div>{children}</div>
    </section>
  );
};

export default Main;
