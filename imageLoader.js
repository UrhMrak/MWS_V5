export default function imageLoader({ src, width, quality }) {
  // The basePath is already configured in next.config.js
  // For static exports, Next.js handles it automatically
  // We don't need to add it here - just return the relative path
  return `${src}?w=${width}&q=${quality || 75}`;
}
