const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting deployment to Bluehost...");

try {
  // Build the project
  console.log("📦 Building project...");
  execSync("npm run build", { stdio: "inherit" });

  // Create .nojekyll file for GitHub Pages compatibility
  console.log("📝 Creating .nojekyll file...");
  fs.writeFileSync(path.join(__dirname, "out", ".nojekyll"), "");

  console.log("✅ Build completed successfully!");
  console.log('📁 Static files are ready in the "out" directory');
  console.log(
    '🔧 Upload the contents of the "out" directory to your Bluehost public_html folder'
  );
} catch (error) {
  console.error("❌ Deployment failed:", error.message);
  process.exit(1);
}
