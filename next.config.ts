import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Allow images from external sources
    domains: ["lh3.googleusercontent.com", "placehold.co"],
  },
};

export default nextConfig;
