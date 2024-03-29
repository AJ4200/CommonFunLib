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
  if (typeof sessionStorage !== "undefined") {
    const storedTheme: string | null = sessionStorage.getItem("THEME");
    return storedTheme;
  } else {
    // Handle the case where sessionStorage is not available
    return null;
  }
};

export const storeTheme = (themeName: string) => {
  sessionStorage.setItem("THEME", themeName);
};
