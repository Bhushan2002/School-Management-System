import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{hostname: 'images.pexels.com'}, {hostname: 'images.unsplash.com'}, {hostname: 'media.licdn.com'},{hostname: 'images.filmibeat.com'}],
    // domains: ['images.pexels.com','images.unsplash.com','media.licdn.com'],
  },
};

export default nextConfig;
