import React from "react";
import {
  FaCog,
  FaExchangeAlt,
  FaHandPointRight,
  FaLock,
  FaTools,
} from "react-icons/fa";
import { RiPaletteFill } from "react-icons/ri";
import { getCurrentTheme } from "@/lib/utils";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({ ...props }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to CommonFunLib</h1>
          <p className="text-lg text-gray-600">
            Commonly used functions in programming.
          </p>
        </header>
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Featured Tools
          </h2>
          <ul className="flex justify-center space-x-4 icon-shadow">
            <li className="bg-[var(--secondary)] rounded-lg shadow-md p-4 icon-shadow">
              <FaCog />
            </li>
            <li className="bg-[var(--secondary)] rounded-lg shadow-md p-4 icon-shadow">
              <FaTools />
            </li>
            <li className="bg-[var(--secondary)] rounded-lg shadow-md p-4 icon-shadow">
              <FaExchangeAlt />
            </li>
            <li className="bg-[var(--secondary)] rounded-lg shadow-md p-4 icon-shadow">
              <FaLock />
            </li>
          </ul>
        </section>
        <footer className="text-center mt-8">
          <p className="text-gray-900">
            Click an icon on the sidebar to begin.
          </p>
        </footer>
        <section className="shadow-inner bottom-0 text-center mt-8 p-4 border-2 border-[var(--secondary)] rounded-lg bg-black/10">
          <p className="text-lg font-bold text-red-600">
            Need a different theme?{" "}
            <span className="text-blue-500 cursor-pointer">CHOOSE AGAIN</span>
          </p>
          <div className="flex items-center justify-center mt-4">
            <p className="mr-2">Click this button in the footer</p>
            <FaHandPointRight className="text-blue-700" />
            <RiPaletteFill
              className="rounded-xl ml-1 p-2 w-9 h-9 transition-transform active:scale-75 border border-[var(--secondary)]"
              style={{
                color: getCurrentTheme()?.foreground,
                backgroundColor: getCurrentTheme()?.background,
                backgroundImage: getCurrentTheme()?.background_pattern,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
