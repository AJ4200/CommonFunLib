/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/common/:path*",
        destination: "http://localhost:3001/common/:path*",
      },
      {
        source: "/generate/:path*",
        destination: "http://localhost:3001/generate/:path*",
      },
      {
        source: "/convert/:path*",
        destination: "http://localhost:3001/convert/:path*",
      },
      {
        source: "/hash/:path*",
        destination: "http://localhost:3001/hash/:path*",
      },
    ];
  },
};

export default nextConfig;
