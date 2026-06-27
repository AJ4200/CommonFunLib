"use client";

import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const PwaInstallButton = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome !== "dismissed") {
      setInstallPrompt(null);
    }
  };

  if (installed || !installPrompt) {
    return null;
  }

  return (
    <button
      type="button"
      className="tool-card grid h-8 w-8 place-items-center rounded-md border border-[var(--secondary)] text-[0.72rem] transition-transform hover:-translate-y-0.5 active:scale-95 sm:h-9 sm:w-9"
      onClick={handleInstall}
      title="Install CommonFunLib"
    >
      <FaDownload className="h-3.5 w-3.5 text-[var(--foreground)] sm:h-4 sm:w-4" />
    </button>
  );
};

export default PwaInstallButton;
