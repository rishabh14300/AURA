/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === "production" ? "build" : ".next",
  experimental: {
    agentFeedback: true,
  },
};

export default nextConfig;
