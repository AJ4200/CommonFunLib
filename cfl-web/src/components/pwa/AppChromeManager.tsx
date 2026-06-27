"use client";

import { useEffect } from "react";
import Theme from "@/models/Theme";
import { getTheme } from "@/lib/themes";
import {
  getStoredTheme,
  themeChangedEvent,
} from "@/components/theme/ThemeManager";

const iconUrl = (theme: Theme, size: number) => {
  const secondary = encodeURIComponent(theme.secondaryColor.trim());
  const background = encodeURIComponent(theme.background.trim());

  return `/api/app-icon?size=${size}&secondary=${secondary}&background=${background}`;
};

const ensureLink = (rel: string, sizes: string, href: string) => {
  let link = document.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"][sizes="${sizes}"]`
  );

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    link.sizes = sizes;
    document.head.appendChild(link);
  }

  link.type = "image/png";
  link.href = href;
};

const ensureMetaThemeColor = (theme: Theme) => {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }

  meta.content = theme.secondaryColor.trim();
};

const syncThemeChrome = (theme: Theme) => {
  ensureLink("icon", "32x32", iconUrl(theme, 32));
  ensureLink("icon", "192x192", iconUrl(theme, 192));
  ensureLink("apple-touch-icon", "180x180", iconUrl(theme, 180));
  ensureMetaThemeColor(theme);
};

const registerServiceWorker = () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const register = () => {
    navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  };

  if (document.readyState === "complete") {
    register();
    return;
  }

  window.addEventListener("load", register, { once: true });
};

const AppChromeManager = () => {
  useEffect(() => {
    syncThemeChrome(getTheme(getStoredTheme() ?? "Classic"));
    registerServiceWorker();

    const handleThemeChange = (event: Event) => {
      const theme = (event as CustomEvent<Theme>).detail;
      syncThemeChrome(theme ?? getTheme(getStoredTheme() ?? "Classic"));
    };

    window.addEventListener(themeChangedEvent, handleThemeChange);

    return () => {
      window.removeEventListener(themeChangedEvent, handleThemeChange);
    };
  }, []);

  return null;
};

export default AppChromeManager;
