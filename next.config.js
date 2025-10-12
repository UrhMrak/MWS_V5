/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/MWS_V5" : "",
  basePath: process.env.NODE_ENV === "production" ? "/MWS_V5" : "",
};

module.exports = nextConfig;
