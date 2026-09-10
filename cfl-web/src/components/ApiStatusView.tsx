"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaBolt, FaCircle, FaClock, FaCode, FaCompress, FaExpand, FaRedo, FaServer, FaWifi } from "react-icons/fa";
import { API_BASE_URL } from "@/lib/apiConfig";

type ApiStatus = {
  status: "ok" | "error" | "checking";
  latency: number | null;
  apiBaseUrl: string;
  configured: boolean;
  message: string;
  upstream: Record<string, unknown> | null;
};

const initialStatus: ApiStatus = {
  status: "checking",
  latency: null,
  apiBaseUrl: API_BASE_URL,
  configured: true,
  message: "Checking API status...",
  upstream: null,
};

const ApiStatusView = ({ onBack }: { onBack: () => void }) => {
  const [apiStatus, setApiStatus] = useState<ApiStatus>(initialStatus);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [checking, setChecking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const checkStatus = useCallback(async () => {
    setChecking(true);
    try {
      const response = await fetch("/api/status", { cache: "no-store" });
      const data = (await response.json()) as ApiStatus;
      setApiStatus(data);
      setLastChecked(new Date());
    } catch {
      setApiStatus({
        ...initialStatus,
        status: "error",
        message: "The status monitor could not reach the web status route.",
      });
      setLastChecked(new Date());
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();
    const interval = window.setInterval(checkStatus, 15000);
    return () => window.clearInterval(interval);
  }, [checkStatus]);

  const healthy = apiStatus.status === "ok";
  const statusColor = healthy ? "text-emerald-300" : apiStatus.status === "checking" ? "text-[var(--secondary)]" : "text-red-300";
  const checkedLabel = lastChecked ? lastChecked.toLocaleTimeString() : "Waiting";

  const renderView = (expanded: boolean) => (
    <section className={`api-status-view relative h-full overflow-y-auto p-3 custome-scroll sm:p-6 ${expanded ? "rounded-lg border-2 border-[var(--secondary)] shadow-2xl" : ""}`}>
      <button
        className="icon-action absolute right-3 top-3 z-20 sm:right-5 sm:top-5"
        onClick={() => setFullscreen((current) => !current)}
        title={expanded ? "Exit full view" : "Open full view"}
        aria-label={expanded ? "Exit full view" : "Open full view"}
        type="button"
      >
        {expanded ? <FaCompress /> : <FaExpand />}
      </button>
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] opacity-70">Live service telemetry</p>
            <h1 className="brand-type mt-1 text-3xl font-black theme-shadow sm:text-5xl">API Status</h1>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 opacity-80">A live view of the CommonFunLib API connection, response speed, runtime payload, and deployment configuration.</p>
          </div>
          <div className="flex gap-2">
            <button className="action-secondary" onClick={onBack} type="button"><FaArrowLeft /> Overview</button>
            <button className="icon-action" onClick={checkStatus} disabled={checking} title="Refresh API status" aria-label="Refresh API status" type="button"><FaRedo className={checking ? "animate-spin" : ""} /></button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="api-status-hero tool-card rounded-2xl border border-[var(--secondary)] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`grid h-14 w-14 place-items-center rounded-xl border border-current bg-black/10 text-2xl ${statusColor}`}><FaServer /></span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] opacity-70">Connection state</p>
                  <h2 className={`brand-type text-3xl font-black ${statusColor}`}>{healthy ? "Online" : apiStatus.status === "checking" ? "Checking" : "Offline"}</h2>
                </div>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-current px-3 py-1.5 text-xs font-black uppercase"><FaCircle className="text-[0.55rem]" /> {apiStatus.status}</span>
            </div>
            <p className="mt-6 text-base font-bold leading-7 opacity-85">{apiStatus.message}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="api-metric"><FaClock /><span>Latency</span><strong>{apiStatus.latency === null ? "--" : `${apiStatus.latency}ms`}</strong></div>
              <div className="api-metric"><FaWifi /><span>Configured</span><strong>{apiStatus.configured ? "Yes" : "Review"}</strong></div>
              <div className="api-metric"><FaBolt /><span>Checked</span><strong>{checkedLabel}</strong></div>
            </div>
          </div>

          <div className="tool-card rounded-2xl border border-[var(--secondary)] p-5">
            <div className="mb-4 flex items-center gap-3"><FaCode className="text-[var(--secondary)]" /><h2 className="brand-type text-xl font-black">Connection details</h2></div>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-xs font-black uppercase opacity-60">API base URL</dt><dd className="mono-surface mt-1 break-all font-bold">{apiStatus.apiBaseUrl || API_BASE_URL}</dd></div>
              <div><dt className="text-xs font-black uppercase opacity-60">Monitor route</dt><dd className="mono-surface mt-1 font-bold">/api/status</dd></div>
              <div><dt className="text-xs font-black uppercase opacity-60">Refresh cadence</dt><dd className="mt-1 font-bold">Every 15 seconds while open</dd></div>
            </dl>
          </div>
        </div>

        <section className="mt-4 tool-card rounded-2xl border border-[var(--secondary)] p-5">
          <div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.18em] opacity-60">Raw upstream signal</p><h2 className="brand-type text-xl font-black">Runtime payload</h2></div><span className="rounded-full border border-[var(--secondary)] px-2 py-1 text-[0.65rem] font-black uppercase">JSON</span></div>
          <pre className="mono-surface code-surface min-h-36 overflow-auto whitespace-pre-wrap break-words rounded-xl p-4 text-xs font-bold">{JSON.stringify(apiStatus.upstream ?? { status: "Waiting for upstream data" }, null, 2)}</pre>
        </section>
      </div>
    </section>
  );

  if (fullscreen && mounted) {
    return <>{renderView(false)}{createPortal(<div className="p-1.5 sm:p-2" style={{ inset: 0, position: "fixed", zIndex: 1000 }}>{renderView(true)}</div>, document.body)}</>;
  }

  return renderView(false);
};

export default ApiStatusView;
