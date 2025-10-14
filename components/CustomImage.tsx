"use client";

import NextImage, { ImageProps } from "next/image";

// Get the basePath from environment or config
const getBasePath = () => {
  // In production (static export), add the GitHub Pages base path
  if (process.env.NODE_ENV === "production") {
    return "/MWS_V5";
  }
  return "";
};

export default function CustomImage({ src, ...props }: ImageProps) {
  const basePath = getBasePath();

  // Only add basePath to relative URLs (strings starting with /)
  const imageSrc =
    typeof src === "string" && src.startsWith("/") ? `${basePath}${src}` : src;

  return <NextImage src={imageSrc} {...props} />;
}
