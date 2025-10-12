export default function imageLoader({ src, width, quality }) {
  const isProd = process.env.NODE_ENV === "production";
  const basePath = isProd ? "/MWS_V5" : "";
  
  return `${basePath}${src}?w=${width}&q=${quality || 75}`;
}
