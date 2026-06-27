import { ImageResponse } from "next/og";
import Logo from "@/icons/Logo";

export const runtime = "edge";

const DEFAULT_SECONDARY = "#4682B4";
const DEFAULT_BACKGROUND = "#A9A9A9";

const cleanHex = (value: string | null, fallback: string) => {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim();
  return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(normalized)
    ? normalized
    : fallback;
};

const cleanSize = (value: string | null) => {
  const parsed = Number.parseInt(value ?? "", 10);

  if (Number.isNaN(parsed)) {
    return 192;
  }

  return Math.min(Math.max(parsed, 32), 512);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const size = cleanSize(searchParams.get("size"));
  const secondary = cleanHex(searchParams.get("secondary"), DEFAULT_SECONDARY);
  const background = cleanHex(searchParams.get("background"), DEFAULT_BACKGROUND);

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Logo color={secondary} style={{ height: size * 0.82, width: size * 0.82 }} />
      </div>
    ),
    {
      height: size,
      width: size,
    }
  );
}
