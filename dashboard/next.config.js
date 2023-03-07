/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID,
    AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET,
    API_KEY_VISION: process.env.API_KEY_VISION,
    JWT_SECRET: process.env.JWT_SECRET
  }
};

module.exports = nextConfig;
