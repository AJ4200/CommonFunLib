import { NextResponse } from "next/server";

const API_BASE_URL = (
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3001"
).replace(/\/+$/, "");

export async function GET() {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  const isLocalFallback = /localhost|127\.0\.0\.1/.test(API_BASE_URL);

  try {
    const response = await fetch(`${API_BASE_URL}/status`, {
      cache: "no-store",
      signal: controller.signal,
    });
    const body = await response.json().catch(() => null);
    const latency = Date.now() - startedAt;

    return NextResponse.json(
      {
        status: response.ok && body?.status === "ok" ? "ok" : "error",
        latency,
        apiBaseUrl: API_BASE_URL,
        configured: !isLocalFallback || process.env.NODE_ENV !== "production",
        message:
          response.ok && body?.status === "ok"
            ? "API is reachable."
            : "API responded, but not with a healthy status.",
        upstream: body,
      },
      { status: response.ok ? 200 : 502 },
    );
  } catch {
    return NextResponse.json(
      {
        status: "error",
        latency: null,
        apiBaseUrl: API_BASE_URL,
        configured: !isLocalFallback || process.env.NODE_ENV !== "production",
        message: isLocalFallback
          ? "API_BASE_URL is using the local default. Set API_BASE_URL or NEXT_PUBLIC_API_BASE_URL for deployed environments."
          : "API could not be reached.",
        upstream: null,
      },
      { status: 503 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
