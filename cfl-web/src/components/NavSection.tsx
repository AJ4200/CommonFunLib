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

  return (
    <div className="border rounded p-4 shadow-md" {...props}>
      <h2 className="text-xl font-bold mb-2">{heading}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex space-x-4">
        <BsInfoCircle
          className={`cursor-pointer ${
            activeTab === 0 ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleTabClick(0)}
        />
        <MdGames
          className={`cursor-pointer ${
            activeTab === 1 ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleTabClick(1)}
        />
        <FaServer
          className={`cursor-pointer ${
            activeTab === 2 ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => handleTabClick(2)}
        />
      </div>
      <div>
        {activeTab === 0 && infoContent}
        {activeTab === 1 && playgroundContent}
        {activeTab === 2 && apiContent}
      </div>
    </div>
  );
};

export default NavSection;
