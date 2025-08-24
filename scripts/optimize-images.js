// scripts/optimize-images.js
import sharp from "sharp";
import { readdirSync, mkdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

const inputDir = "public/images";
const outputDir = "public/images/optimized";
const sizes = [1280, 1920, 2560];

mkdirSync(outputDir, { recursive: true });

function isImage(file) {
  const ext = extname(file).toLowerCase();
  return [".png", ".jpg", ".jpeg"].includes(ext);
}

function isInOptimized(filePath) {
  // Evita procesar cosas que ya están en /optimized
  return filePath.replaceAll("\\", "/").includes("/images/optimized/");
}

async function processOne(file) {
  const src = join(inputDir, file);
  if (isInOptimized(src) || !isImage(file)) return;

  const base = basename(file, extname(file));
  const tasks = [];

  for (const size of sizes) {
    const pipeline = sharp(src).resize({ width: size });

    tasks.push(
      pipeline.clone().webp({ quality: 80 }).toFile(join(outputDir, `${base}-${size}.webp`)),
      pipeline.clone().avif({ quality: 50 }).toFile(join(outputDir, `${base}-${size}.avif`)),
      pipeline.clone().jpeg({ quality: 75 }).toFile(join(outputDir, `${base}-${size}.jpg`))
    );
  }

  await Promise.all(tasks);
}

async function main() {
  // Listá solo archivos (por si hay subcarpetas)
  const entries = readdirSync(inputDir).filter((name) => {
    const full = join(inputDir, name);
    try { return statSync(full).isFile(); } catch { return false; }
  });

  for (const file of entries) {
    await processOne(file);
  }

  console.log("✅ Imágenes optimizadas (WebP/AVIF/JPG) en", outputDir);
}

main().catch((err) => {
  console.error("❌ Error optimizando imágenes:", err);
  process.exit(1);
});
