/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "./src")],
    prependData: `@import "styles/variables.module.scss";`,
  },
};

module.exports = nextConfig;

