import React from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <section className="glass-panel h-full min-w-0 flex-1 overflow-hidden rounded-lg border-2 border-[var(--secondary)] backdrop-blur-md">
      <div className="h-full">{children}</div>
    </section>
  );
};

export default Main;
