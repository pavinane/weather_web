/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
  env: {
    NEXT_API_KEY: process.env.NEXT_API_KEY,
    NEXT_CLIENT_ID: process.env.NEXT_CLIENT_ID,
  },
};

export default nextConfig;
