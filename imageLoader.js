export default function imageLoader({ src, width, quality }) {
  // Check if we're on the GitHub Pages subdirectory
  const isGitHubPages =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/MWS_V5");
  const basePath = isGitHubPages ? "/MWS_V5" : "";

  return `${basePath}${src}?w=${width}&q=${quality || 75}`;
}
