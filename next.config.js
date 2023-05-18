/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    ALGORITHM: process.env.ALGORITHM,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false,
};

module.exports = nextConfig;
