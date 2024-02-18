// Home.tsx
import React, { useState, useEffect } from "react";
import ThemePickerModal from "@/components/Utils/ThemePicker";
import { getStoredTheme } from "@/components/Utils/ThemeManager";
import { RiPaletteFill } from "react-icons/ri";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedTheme = getStoredTheme();
    if (!storedTheme) {
      setShowModal(true);
    }
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-3 shadow-lg"
        onClick={handleOpenModal}
      >
        <RiPaletteFill className="text-2xl" />
      </button>
      {showModal && <ThemePickerModal />}
    </>
  );
};

export default Home;
