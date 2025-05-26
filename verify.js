#!/usr/bin/env node

/**
 * Simple verification script to check if site is ready for deployment
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Verifying site files before deployment...");

// List of critical files
const criticalFiles = [
  "index.html",
  "portfolio.html",
  "css/styles.css",
  "js/main.js",
  "manifest.json",
  "robots.txt",
  "sitemap.xml",
  "img/favicon.png",
  "img/1.jpg",
  "img/appCiclica.png",
  "img/sqlagent.jpg",
  "videos/mediaChat.mp4",
  "vercel.json",
];

console.log("📋 Checking critical files...");
let allFilesPresent = true;

criticalFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allFilesPresent = false;
  }
});

if (allFilesPresent) {
  console.log(
    "🚀 All critical files are present. Site is ready for deployment!"
  );
  console.log("\nTo deploy your site to Vercel, run one of the following:");
  console.log("- npm run deploy");
  console.log("- node deploy.js");
} else {
  console.log(
    "⚠️ Some critical files are missing. Please fix before deploying."
  );
}

console.log("\nRemember to install the Vercel CLI if you haven't:");
console.log("npm install -g vercel");
