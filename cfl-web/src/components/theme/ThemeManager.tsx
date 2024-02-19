import Theme from "@/models/Theme";

export const applyTheme = (theme: Theme) => {
  document.documentElement.style.setProperty("--primary", theme.primaryColor);
  document.documentElement.style.setProperty(
    "--secondary",
    theme.secondaryColor
  );
  document.documentElement.style.setProperty("--foreground", theme.foreground);
  document.documentElement.style.setProperty(
    "--background",
    theme.secondaryColor
  );
  document.documentElement.style.setProperty(
    "--background-image",
    theme.background_pattern
  );
};

export const getStoredTheme = () => {
  return sessionStorage.getItem("THEME");
};

export const storeTheme = (themeName: string) => {
  sessionStorage.setItem("THEME", themeName);
};
