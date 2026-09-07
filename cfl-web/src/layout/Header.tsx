"use client";

import Logo from "@/icons/Logo";
import React, { useEffect, useState } from "react";
import { FaCircle, FaServer } from "react-icons/fa";

interface HeaderProps {
  onOpenApiStatus?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenApiStatus, ...props }) => {
  const [status, setStatus] = useState<"checking" | "online" | "slow" | "setup" | "offline" | "network">("checking");
  const [latency, setLatency] = useState<number | null>(null);
  const [apiLabel, setApiLabel] = useState("API");
  const [statusMessage, setStatusMessage] = useState("Checking API status");

  useEffect(() => {
    let active = true;

    const checkApi = async () => {
      if (!navigator.onLine) {
        setLatency(null);
        setStatus("network");
        setStatusMessage("Your browser is offline.");
        return;
      }

      const startedAt = performance.now();
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 3500);

      try {
        const response = await fetch("/api/status", {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);
        const elapsed = Math.round(performance.now() - startedAt);

        if (!active) return;

        if (data?.apiBaseUrl) {
          try {
            setApiLabel(new URL(data.apiBaseUrl).host);
          } catch {
            setApiLabel(data.apiBaseUrl);
          }
        }

        const measuredLatency = typeof data?.latency === "number" ? data.latency : elapsed;
        setLatency(response.ok ? measuredLatency : null);
        setStatusMessage(data?.message ?? "API status checked.");
        setStatus(
          response.ok && data?.status === "ok"
            ? measuredLatency > 1200
              ? "slow"
              : "online"
            : data?.configured === false
              ? "setup"
              : "offline"
        );
      } catch {
        if (!active) return;
        setLatency(null);
        setStatus("offline");
        setStatusMessage("API could not be reached.");
      } finally {
        window.clearTimeout(timeout);
      }
    };

    checkApi();
    const interval = window.setInterval(checkApi, 30000);
    window.addEventListener("online", checkApi);
    window.addEventListener("offline", checkApi);

    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("online", checkApi);
      window.removeEventListener("offline", checkApi);
    };
  }, []);

  const statusLabel =
    status === "checking"
      ? "Checking"
      : status === "online"
        ? "Online"
        : status === "slow"
          ? "Slow"
          : status === "setup"
            ? "Setup"
            : status === "network"
              ? "No net"
              : "Offline";

  const statusClass =
    status === "online"
        ? "text-emerald-300"
        : status === "slow"
          ? "text-yellow-300"
          : status === "setup"
            ? "text-sky-300"
            : status === "network"
              ? "text-orange-300"
              : status === "offline"
                ? "text-red-300"
                : "text-[var(--secondary)]";

  return (
    <header
      className="chrome-panel h-full w-full rounded-lg border-2 border-[var(--secondary)]"
      {...props}
    >
      <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-4">
        <button
          className="brand-type flex min-w-0 items-center text-left text-xl font-black theme-shadow transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--secondary)] sm:text-3xl"
          onClick={() => window.location.assign("/")}
          title="Return to CommonFunLib overview"
          type="button"
        >
          <Logo className="h-11 w-11 shrink-0 sm:h-16 sm:w-16" />
          <span className="truncate">CommonFunLib</span>
        </button>
        <div
          className="ml-auto flex min-w-0 items-center gap-2"
          title={`API status: ${statusLabel}. ${statusMessage}`}
        >
          <button className="api-status-button" onClick={onOpenApiStatus} type="button" aria-label="Open API status dashboard">
            <FaServer className="shrink-0 text-[var(--secondary)]" />
            <span className="hidden max-w-44 truncate sm:inline">{apiLabel}</span>
            <span className="flex items-center gap-1.5"><FaCircle className={`text-[0.55rem] ${statusClass}`} />{statusLabel}</span>
            {latency !== null ? <span className="mono-surface hidden rounded-md bg-black/15 px-2 py-0.5 text-[0.7rem] sm:inline">{latency}ms</span> : null}
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
