"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemePicker from "@/components/theme/ThemePicker";
import { getStoredFont } from "@/components/font/FontManager";
import { getStoredTheme } from "@/components/theme/ThemeManager";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (getStoredTheme() && getStoredFont()) {
      router.replace("/homepage");
    }
  }, [router]);

  return <ThemePicker initialOpen={true} />;
}
