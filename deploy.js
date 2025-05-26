#!/usr/bin/env node

/**
 * This script deploys the site to Vercel
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// First, run the preparation script
try {
  console.log("🔍 Running preparation script...");
  require("./prepare");
} catch (error) {
  console.error("❌ Preparation failed:", error);
  process.exit(1);
}

// Deploy to Vercel
console.log("🚀 Deploying to Vercel...");
try {
  execSync("vercel --prod", { stdio: "inherit" });
  console.log("✅ Deployment successful!");
} catch (error) {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
}

console.log(
  "👉 Your site should now be live at: https://thyemimello.vercel.app"
);
