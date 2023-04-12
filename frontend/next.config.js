/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "./src")],
    prependData: `@import "styles/variables.module.scss";`,
  },
};

module.exports = nextConfig;

