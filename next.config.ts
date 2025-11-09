import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    // Quick allow-list (works for all paths on this host)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shadcnstudio.com",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
