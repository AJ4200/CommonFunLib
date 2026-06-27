"use client";

import Logo from "@/icons/Logo";
import { getTheme } from "@/lib/themes";
import { applyFont, getCurrentFont } from "@/components/font/FontManager";
import {
  applyTheme,
  getStoredTheme,
} from "@/components/theme/ThemeManager";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaArrowLeft, FaHome, FaRedoAlt } from "react-icons/fa";

interface ThemedStatePageProps {
  code: string;
  title: string;
  message: string;
  reset?: () => void;
}

const ThemedStatePage: React.FC<ThemedStatePageProps> = ({
  code,
  title,
  message,
  reset,
}) => {
  const router = useRouter();
  const theme = getTheme(getStoredTheme() ?? "Classic");

  useEffect(() => {
    applyTheme(theme);
    applyFont(getCurrentFont());
  }, [theme]);

  return (
    <main
      className="app-shell grid h-dvh w-dvw place-items-center overflow-hidden p-3 sm:p-5"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: "var(--background-image)",
      }}
    >
      <section className="glass-panel w-full max-w-3xl overflow-hidden rounded-lg border-2 border-[var(--secondary)]">
        <div className="chrome-panel flex items-center gap-3 border-b-2 border-[var(--secondary)] px-4 py-3 sm:px-6 sm:py-4">
          <Logo className="h-14 w-14 shrink-0 sm:h-16 sm:w-16" />
          <div className="min-w-0">
            <p className="mono-surface text-xs font-black uppercase opacity-80">
              CommonFunLib / {code}
            </p>
            <h1 className="brand-type truncate text-2xl font-black theme-shadow sm:text-4xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6 sm:py-8">
          <p className="max-w-2xl text-sm font-bold leading-6 opacity-90 sm:text-base sm:leading-7">
            {message}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="action-primary" href="/homepage">
              <FaHome />
              Home
            </Link>
            <button
              type="button"
              className="action-secondary"
              onClick={() => router.back()}
            >
              <FaArrowLeft />
              Back
            </button>
            {reset ? (
              <button type="button" className="action-secondary" onClick={reset}>
                <FaRedoAlt />
                Try again
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ThemedStatePage;
