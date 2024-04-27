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
  const [hoveredTab, setHoveredTab] = useState(0);
  const [showLabel, setShowLabel] = useState(false);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const icons = [
    { icon: <BsInfoCircle />, tabIndex: 0, label: "Information" },
    { icon: <MdGames />, tabIndex: 1, label: "Playground" },
    { icon: <FaServer />, tabIndex: 2, label: "API Route" },
  ];

  return (
    <div className="h-full" {...props}>
      <h2 className="text-2xl m-2 theme-shadow font-bold mb-2 text-center">
        {heading}
      </h2>
      <p className=" mb-4 text-center">{description}</p>
      <div className="border border-[var(--secondary)] rounded-md p-4 shadow-lg flex m-8 flex-row justify-between backdrop-blur-2xl max-h-96">
        <div>
          {activeTab === 0 && infoContent}
          {activeTab === 1 && playgroundContent}
          {activeTab === 2 && apiContent}
        </div>{" "}
        <div className="flex space-y-4 flex-col ">
          {icons.map(({ icon, label, tabIndex }) => (
            <div
              key={tabIndex}
              className={` w-max cursor-pointer bg-[var(--secondary)] rounded-lg shadow-md p-3 self-end ${
                activeTab === tabIndex ? "icon-shadow" : "text-[var(--primary)]"
              } `}
              onClick={() => handleTabClick(tabIndex)}
              onMouseEnter={() => {
                setShowLabel(true);
                setHoveredTab(tabIndex);
              }}
              onMouseLeave={() => setShowLabel(false)}
            >
              <div className="flex items-center transition-all delay-300 space-x-2 ">
                {activeTab === tabIndex ? (
                  <span className="text-sm">{label}</span>
                ) : (
                  ""
                )}
                {showLabel &&
                hoveredTab === tabIndex &&
                activeTab != tabIndex ? (
                  <span className="text-sm">{label}</span>
                ) : (
                  ""
                )}
                {icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavSection;
