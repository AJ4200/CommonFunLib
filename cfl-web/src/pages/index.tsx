// Home.tsx
import React, { useState, useEffect } from "react";
import ThemePicker from "@/components/theme/ThemePicker";
import { getStoredTheme } from "@/components/theme/ThemeManager";
import { RiPaletteFill } from "react-icons/ri";
import { useRouter } from "next/router";

const Home = () => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      router.push("/homepage");
    }
  }, []);


  return (
    <>
      <ThemePicker initialOpen={showModal} />
    </>
  );
};

export default Home;
