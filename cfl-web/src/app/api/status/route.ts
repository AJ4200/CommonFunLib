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
        upstream: null,
      },
      { status: 503 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
