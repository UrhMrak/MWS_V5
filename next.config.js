/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/MWS_V5" : "";

const nextConfig = {
  output: isProd ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: "custom",
    loaderFile: "./imageLoader.js",
  },
  basePath: basePath,
  assetPrefix: basePath,
};

module.exports = nextConfig;
