import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdGames } from "react-icons/md";
import { FaServer } from "react-icons/fa";

interface NavSectionProps {
  heading: string;
  description: string;
  infoContent: React.ReactNode;
  playgroundContent: React.ReactNode;
  apiContent: React.ReactNode;
}

const NavSection: React.FC<NavSectionProps> = ({
  heading,
  description,
  infoContent,
  playgroundContent,
  apiContent,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const icons = [
    { icon: <BsInfoCircle />, tabIndex: 0 },
    { icon: <MdGames />, tabIndex: 1 },
    { icon: <FaServer />, tabIndex: 2 },
  ];

  return (
    <div className="h-full" {...props}>
      <h2 className="text-2xl m-2 theme-shadow font-bold mb-2 text-center">
        {heading}
      </h2>
      <p className=" mb-4 text-center">{description}</p>
      <div className="border border-[var(--secondary)] rounded-md p-4 shadow-lg flex m-8 flex-row justify-between backdrop-blur-2xl h-[80%]">
        <div>
          {activeTab === 0 && infoContent}
          {activeTab === 1 && playgroundContent}
          {activeTab === 2 && apiContent}
        </div>{" "}
        <div className="flex space-y-4 flex-col justify-evenly">
          {icons.map(({ icon, tabIndex }) => (
            <div
              key={tabIndex}
              className={`cursor-pointer bg-[var(--secondary)] rounded-lg shadow-md p-3 ${
                activeTab === tabIndex ? "icon-shadow" : "text-[var(--primary)]"
              }`}
              onClick={() => handleTabClick(tabIndex)}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavSection;
