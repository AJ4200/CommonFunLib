import type { MetadataRoute } from "next";

const iconUrl = (size: number) =>
  `/api/app-icon?size=${size}&secondary=%234682B4&background=%23A9A9A9`;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CommonFunLib",
    short_name: "CommonFunLib",
    description: "Developer utility playground for CommonFunLib APIs.",
    start_url: "/homepage",
    scope: "/",
    display: "standalone",
    background_color: "#A9A9A9",
    theme_color: "#4682B4",
    icons: [
      {
        src: iconUrl(192),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: iconUrl(512),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: iconUrl(512),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
