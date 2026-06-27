import Theme from "@/models/Theme";

const THEME_STORAGE_KEY = "THEME";
const THEME_CHANGED_EVENT = "commonfunlib:theme-change";

const cleanColor = (color: string) => color.trim();

const hexToRgb = (color: string) => {
  const hex = cleanColor(color).replace("#", "");
  const normalized =
    hex.length === 3
      ? hex
          .split("")
          .map((value) => value + value)
          .join("")
      : hex;

  const value = Number.parseInt(normalized, 16);

  if (Number.isNaN(value)) {
    return { r: 17, g: 24, b: 39 };
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const toRgbChannels = (color: string) => {
  const { r, g, b } = hexToRgb(color);
  return `${r} ${g} ${b}`;
};

const getReadableTextColor = (color: string) => {
  const { r, g, b } = hexToRgb(color);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58 ? "#111827" : "#ffffff";
};

const setThemeProperty = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value);
};

export const applyTheme = (theme: Theme, notify = true) => {
  if (typeof document === "undefined") {
    return;
  }

  const primary = cleanColor(theme.primaryColor);
  const secondary = cleanColor(theme.secondaryColor);
  const foreground = cleanColor(theme.foreground);
  const background = cleanColor(theme.background);

  setThemeProperty("--primary", primary);
  setThemeProperty("--primary-rgb", toRgbChannels(primary));
  setThemeProperty("--primary-foreground", getReadableTextColor(primary));
  setThemeProperty("--primary-foreground-rgb", toRgbChannels(getReadableTextColor(primary)));
  setThemeProperty("--secondary", secondary);
  setThemeProperty("--secondary-rgb", toRgbChannels(secondary));
  setThemeProperty("--secondary-foreground", getReadableTextColor(secondary));
  setThemeProperty(
    "--secondary-foreground-rgb",
    toRgbChannels(getReadableTextColor(secondary))
  );
  setThemeProperty("--foreground", foreground);
  setThemeProperty("--foreground-rgb", toRgbChannels(foreground));
  setThemeProperty("--background", background);
  setThemeProperty("--background-rgb", toRgbChannels(background));
  setThemeProperty("--background-image", theme.background_pattern);
  setThemeProperty("--card", "rgba(255, 255, 255, 0.12)");
  setThemeProperty("--card-rgb", "255 255 255");
  setThemeProperty("--card-foreground", foreground);
  setThemeProperty("--card-foreground-rgb", toRgbChannels(foreground));
  setThemeProperty("--popover", background);
  setThemeProperty("--popover-rgb", toRgbChannels(background));
  setThemeProperty("--popover-foreground", foreground);
  setThemeProperty("--popover-foreground-rgb", toRgbChannels(foreground));
  setThemeProperty("--muted", "rgba(255, 255, 255, 0.16)");
  setThemeProperty("--muted-rgb", "255 255 255");
  setThemeProperty("--muted-foreground", foreground);
  setThemeProperty("--muted-foreground-rgb", toRgbChannels(foreground));
  setThemeProperty("--accent", secondary);
  setThemeProperty("--accent-rgb", toRgbChannels(secondary));
  setThemeProperty("--accent-foreground", getReadableTextColor(secondary));
  setThemeProperty("--accent-foreground-rgb", toRgbChannels(getReadableTextColor(secondary)));
  setThemeProperty("--border", `color-mix(in srgb, ${secondary} 78%, transparent)`);
  setThemeProperty("--border-rgb", toRgbChannels(secondary));
  setThemeProperty("--input", `color-mix(in srgb, ${primary} 72%, transparent)`);
  setThemeProperty("--input-rgb", toRgbChannels(primary));
  setThemeProperty("--ring", secondary);
  setThemeProperty("--ring-rgb", toRgbChannels(secondary));
  setThemeProperty("--panel", "rgba(10, 14, 20, 0.12)");
  setThemeProperty("--panel-strong", "rgba(255, 255, 255, 0.14)");
  setThemeProperty("--hairline", "rgba(255, 255, 255, 0.24)");
  document.documentElement.dataset.theme = theme.name;

  if (notify) {
    window.dispatchEvent(new CustomEvent(THEME_CHANGED_EVENT, { detail: theme }));
  }
};

export const getStoredTheme = () => {
  if (typeof sessionStorage !== "undefined") {
    return sessionStorage.getItem(THEME_STORAGE_KEY);
  }

  return null;
};

export const storeTheme = (themeName: string) => {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem(THEME_STORAGE_KEY, themeName);
  }
};

export const themeChangedEvent = THEME_CHANGED_EVENT;
