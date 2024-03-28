// Home.tsx
import React, { useEffect } from "react";
import ThemePicker from "@/components/theme/ThemePicker";
import { getStoredTheme } from "@/components/theme/ThemeManager";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      router.push("/homepage");
    }
  }, []);

  return (
    <>
      <ThemePicker initialOpen={true} />
    </>
  );
};

export default Home;
