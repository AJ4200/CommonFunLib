/** @type {import('next').NextConfig} */
const apiBaseUrl = (
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3001"
).replace(/\/$/, "");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/common/:path*",
        destination: `${apiBaseUrl}/common/:path*`,
      },
      {
        source: "/generate/:path*",
        destination: `${apiBaseUrl}/generate/:path*`,
      },
      {
        source: "/convert/:path*",
        destination: `${apiBaseUrl}/convert/:path*`,
      },
      {
        source: "/hash/:path*",
        destination: `${apiBaseUrl}/hash/:path*`,
      },
    ];
  },
};

export default nextConfig;
