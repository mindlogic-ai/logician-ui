#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { optimize } = require("svgo");

const ICONS_DIR = path.join(__dirname, "../src/components/Icon/icons");

const svgoConfig = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false, // Keep viewBox for proper scaling
          removeTitle: false, // Keep title for accessibility
        },
      },
    },
  ],
};

async function optimizeSVGFile(filePath) {
  try {
    const svgContent = fs.readFileSync(filePath, "utf8");
    const result = optimize(svgContent, { path: filePath, ...svgoConfig });

    if (result.error) {
      console.error(
        `❌ Error optimizing ${path.basename(filePath)}:`,
        result.error
      );
      return false;
    }

    const originalSize = Buffer.byteLength(svgContent, "utf8");
    const optimizedSize = Buffer.byteLength(result.data, "utf8");
    const savings = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(1);

    if (result.data !== svgContent) {
      fs.writeFileSync(filePath, result.data);
      console.log(
        `✅ ${path.basename(
          filePath
        )}: ${originalSize}B → ${optimizedSize}B (-${savings}%)`
      );
    } else {
      console.log(`✨ ${path.basename(filePath)}: Already optimized`);
    }

    return true;
  } catch (error) {
    console.error(
      `❌ Error processing ${path.basename(filePath)}:`,
      error.message
    );
    return false;
  }
}

async function main() {
  console.log("🚀 Optimizing Icon SVGs...\n");

  if (!fs.existsSync(ICONS_DIR)) {
    console.error(`Icons directory not found: ${ICONS_DIR}`);
    process.exit(1);
  }

  const svgFiles = fs
    .readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith(".svg"))
    .map((file) => path.join(ICONS_DIR, file));

  if (svgFiles.length === 0) {
    console.log("No SVG files found to optimize.");
    return;
  }

  console.log(`Found ${svgFiles.length} SVG icon files:\n`);

  let successCount = 0;
  for (const filePath of svgFiles) {
    const success = await optimizeSVGFile(filePath);
    if (success) successCount++;
  }

  console.log(
    `\n🎉 Complete! ${successCount}/${svgFiles.length} icons optimized.`
  );
}

main().catch(console.error);
