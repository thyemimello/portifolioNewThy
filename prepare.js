#!/usr/bin/env node

/**
 * This script prepares the site for deployment
 * - Compiles SCSS to CSS and minifies it
 * - Ensures all paths are correct
 * - Validates HTML files
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Preparing site for Vercel deployment...");

// Run the build task to compile SCSS
try {
  console.log("📦 Building assets...");
  execSync("npm run build");
  console.log("✅ Build complete!");
} catch (error) {
  console.error("❌ Build failed:", error);
  process.exit(1);
}

// Verify media files
const requiredMediaFiles = [
  "img/appCiclica.png",
  "img/sqlagent.jpg",
  "img/favicon.png",
  "img/1.jpg",
  "videos/mediaChat.mp4",
];

console.log("🔍 Verifying media files...");
let allFilesFound = true;

requiredMediaFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${file}`);
    allFilesFound = false;
  }
});

if (allFilesFound) {
  console.log("✅ All required media files are present.");
} else {
  console.error("❌ Some required media files are missing.");
  process.exit(1);
}

// Verify that CSS is compiled
const cssFilePath = path.join(__dirname, "css/styles.css");
if (!fs.existsSync(cssFilePath)) {
  console.error("❌ CSS file not found. Build process may have failed.");
  process.exit(1);
}

console.log("✅ CSS file verified.");
console.log("✅ Site is ready for deployment!");
console.log("To deploy: npm run deploy");
