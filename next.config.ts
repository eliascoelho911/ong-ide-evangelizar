import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com"
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
		serverActions: {
      allowedOrigins: [
        'http://localhost:3000'
      ]
    },
	}
};

export default nextConfig;
