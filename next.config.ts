import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.226'],
};

export default nextConfig;
