import "@/styles/globals.css";
import "@/styles/loader.css";
import AppChromeManager from "@/components/pwa/AppChromeManager";
import type { Metadata, Viewport } from "next";
import {
  Bangers,
  Chewy,
  Comic_Neue,
  Freckle_Face,
  JetBrains_Mono,
  Kablammo,
  Monoton,
  Nunito,
  Rubik_Bubbles,
  Rubik_Glitch,
  Silkscreen,
} from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const bangers = Bangers({
  subsets: ["latin"],
  variable: "--font-bangers",
  weight: "400",
  display: "swap",
});

const chewy = Chewy({
  subsets: ["latin"],
  variable: "--font-chewy",
  weight: "400",
  display: "swap",
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic-neue",
  weight: ["400", "700"],
  display: "swap",
});

const freckleFace = Freckle_Face({
  subsets: ["latin"],
  variable: "--font-freckle-face",
  weight: "400",
  display: "swap",
});

const kablammo = Kablammo({
  subsets: ["latin"],
  variable: "--font-kablammo",
  display: "swap",
});

const monoton = Monoton({
  subsets: ["latin"],
  variable: "--font-monoton",
  weight: "400",
  display: "swap",
});

const rubikBubbles = Rubik_Bubbles({
  subsets: ["latin"],
  variable: "--font-rubik-bubbles",
  weight: "400",
  display: "swap",
});

const rubikGlitch = Rubik_Glitch({
  subsets: ["latin"],
  variable: "--font-rubik-glitch",
  weight: "400",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CommonFunLib",
  description: "Developer utility playground for CommonFunLib APIs.",
  applicationName: "CommonFunLib",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CommonFunLib",
  },
  icons: {
    icon: [
      {
        url: "/api/app-icon?size=32&secondary=%234682B4&background=%23A9A9A9",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/api/app-icon?size=192&secondary=%234682B4&background=%23A9A9A9",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/api/app-icon?size=180&secondary=%234682B4&background=%23A9A9A9",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#4682B4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [
    nunito.variable,
    jetBrainsMono.variable,
    bangers.variable,
    chewy.variable,
    comicNeue.variable,
    freckleFace.variable,
    kablammo.variable,
    monoton.variable,
    rubikBubbles.variable,
    rubikGlitch.variable,
    silkscreen.variable,
  ].join(" ");

  return (
    <html lang="en">
      <body className={fontVariables}>
        <AppChromeManager />
        {children}
      </body>
    </html>
  );
}
