"use client";

import Logo from "@/icons/Logo";
import React, { useEffect, useState } from "react";
import { FaCircle, FaServer } from "react-icons/fa";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const [status, setStatus] = useState<"checking" | "online" | "slow" | "offline">("checking");
  const [latency, setLatency] = useState<number | null>(null);
  const [apiLabel, setApiLabel] = useState("API");

  useEffect(() => {
    let active = true;

    const checkApi = async () => {
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
        setStatus(response.ok && data?.status === "ok" ? (measuredLatency > 1200 ? "slow" : "online") : "offline");
      } catch {
        if (!active) return;
        setLatency(null);
        setStatus("offline");
      } finally {
        window.clearTimeout(timeout);
      }
    };

    checkApi();
    const interval = window.setInterval(checkApi, 30000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const statusLabel =
    status === "checking"
      ? "Checking"
      : status === "online"
        ? "Online"
        : status === "slow"
          ? "Slow"
          : "Offline";

  const statusClass =
    status === "online"
      ? "text-emerald-300"
      : status === "slow"
        ? "text-yellow-300"
        : status === "offline"
          ? "text-red-300"
          : "text-[var(--secondary)]";

  return (
    <header
      className="chrome-panel h-full w-full rounded-lg border-2 border-[var(--secondary)]"
      {...props}
    >
      <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-4">
        <h1 className="brand-type flex min-w-0 items-center text-xl font-black theme-shadow sm:text-3xl">
          <Logo className="h-11 w-11 shrink-0 sm:h-16 sm:w-16" />
          <span className="truncate">CommonFunLib</span>
        </h1>
        <div
          className="ml-auto flex min-w-0 items-center gap-2 rounded-lg border border-[var(--secondary)] bg-black/10 px-2 py-1.5 text-xs font-black sm:px-3 sm:py-2 sm:text-sm"
          title={`API status: ${statusLabel}`}
        >
          <FaServer className="shrink-0 text-[var(--secondary)]" />
          <span className="hidden max-w-44 truncate sm:inline">{apiLabel}</span>
          <span className="flex items-center gap-1.5">
            <FaCircle className={`text-[0.55rem] ${statusClass}`} />
            {statusLabel}
          </span>
          {latency !== null ? (
            <span className="mono-surface hidden rounded-md bg-black/15 px-2 py-0.5 text-[0.7rem] sm:inline">
              {latency}ms
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
};
export default Header;
