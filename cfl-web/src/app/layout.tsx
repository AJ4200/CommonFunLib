import "@/styles/globals.css";
import "@/styles/loader.css";
import type { Metadata } from "next";
import { JetBrains_Mono, Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CommonFunLib",
  description: "Developer utility playground for CommonFunLib APIs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
