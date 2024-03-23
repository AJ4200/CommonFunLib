import React from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <section
      className="flex flex-col justify-center items-center"
      style={{ minHeight: "calc(100vh - 5rem)", position: "relative" }} // Adjusted for header and footer height
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default Main;
