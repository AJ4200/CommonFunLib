import React from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <section
      className="w-full m-2 h-full rounded-xl backdrop-blur-md border-[var(--secondary)] border-2 shadow-2xl "
      style={{ maxWidth: "calc(100% - 1rem)", margin: "0.5rem auto 0.5rem" }}
    >
      <div>{children}</div>
    </section>
  );
};

export default Main;
