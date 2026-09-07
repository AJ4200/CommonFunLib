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
  const [apiVersion, setApiVersion] = useState<string | null>(null);
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

        setApiVersion(typeof data?.apiVersion === "string" ? data.apiVersion : null);

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
      className="chrome-panel h-full w-full overflow-hidden rounded-lg border-2 border-[var(--secondary)]"
      {...props}
    >
      <div className="flex h-full min-h-0 items-center justify-between gap-3 px-3 sm:px-4">
        <button
          className="brand-type flex h-full min-h-0 min-w-0 items-center text-left text-xl font-black theme-shadow transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--secondary)] sm:text-3xl"
          onClick={() => window.location.assign("/")}
          title="Return to CommonFunLib overview"
          type="button"
        >
          <span className="flex max-h-full shrink-0 flex-col items-center justify-center">
            <Logo className="h-9 w-9 sm:h-12 sm:w-12" />
            <span className="mt-0.5 leading-none text-[0.55rem] font-black tracking-[0.08em] opacity-75 sm:text-[0.65rem]">
              v{apiVersion ?? "--"}
            </span>
          </span>
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
