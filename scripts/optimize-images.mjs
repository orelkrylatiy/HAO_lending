import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT_DIR = process.cwd();
const INPUT_DIR = path.join(ROOT_DIR, "public/images");
const OUTPUT_DIR = path.join(ROOT_DIR, "public/images-optimized");
const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function getProfile(relativePath) {
  if (relativePath.startsWith(`reviews${path.sep}`)) {
    return {
      width: 200,
      height: 200,
      fit: "cover",
      quality: 72,
    };
  }

  if (relativePath.startsWith(`teachers${path.sep}`)) {
    return {
      width: 500,
      height: 600,
      fit: "cover",
      quality: 78,
    };
  }

  return {
    width: 1600,
    quality: 78,
  };
}

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectFiles(fullPath);
      }
      return fullPath;
    }),
  );

  return files.flat();
}

function formatKilobytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function ensureCleanOutputDir() {
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function optimizeFile(inputPath) {
  const relativePath = path.relative(INPUT_DIR, inputPath);
  const extension = path.extname(inputPath).toLowerCase();

  if (!RASTER_EXTENSIONS.has(extension)) {
    return null;
  }

  const profile = getProfile(relativePath);
  const optimizedOutputPath = path.join(
    OUTPUT_DIR,
    path.dirname(relativePath),
    `${path.parse(relativePath).name}.webp`,
  );

  await fs.mkdir(path.dirname(optimizedOutputPath), { recursive: true });

  const inputBuffer = await fs.readFile(inputPath);
  const inputSize = inputBuffer.byteLength;
  const image = sharp(inputBuffer, { animated: false });

  let pipeline = image.rotate().resize({
    width: profile.width,
    height: profile.height,
    fit: profile.fit ?? "inside",
    withoutEnlargement: true,
  });

  pipeline = pipeline.webp({
    quality: profile.quality,
    effort: 6,
  });

  const optimizedBuffer = await pipeline.toBuffer();
  const optimizedSize = optimizedBuffer.byteLength;

  if (optimizedSize < inputSize) {
    await fs.writeFile(optimizedOutputPath, optimizedBuffer);

    return {
      relativePath,
      outputRelativePath: path.relative(ROOT_DIR, optimizedOutputPath),
      inputSize,
      outputSize: optimizedSize,
      savedBytes: inputSize - optimizedSize,
      wasOptimized: true,
    };
  }

  const originalOutputPath = path.join(OUTPUT_DIR, relativePath);
  await fs.mkdir(path.dirname(originalOutputPath), { recursive: true });
  await fs.writeFile(originalOutputPath, inputBuffer);

  return {
    relativePath,
    outputRelativePath: path.relative(ROOT_DIR, originalOutputPath),
    inputSize,
    outputSize: inputSize,
    savedBytes: 0,
    wasOptimized: false,
  };
}

async function main() {
  await ensureCleanOutputDir();

  const inputFiles = await collectFiles(INPUT_DIR);
  const rasterFiles = inputFiles.filter((file) =>
    RASTER_EXTENSIONS.has(path.extname(file).toLowerCase()),
  );

  if (rasterFiles.length === 0) {
    console.log("No raster images found in public/images");
    return;
  }

  const results = [];

  for (const file of rasterFiles) {
    const result = await optimizeFile(file);
    if (result) {
      results.push(result);
    }
  }

  let totalInputSize = 0;
  let totalOutputSize = 0;

  for (const result of results) {
    totalInputSize += result.inputSize;
    totalOutputSize += result.outputSize;
    const percent = ((1 - result.outputSize / result.inputSize) * 100).toFixed(1);
    console.log(
      `${result.relativePath} -> ${result.outputRelativePath} | ${formatKilobytes(result.inputSize)} -> ${formatKilobytes(result.outputSize)} (${percent}% smaller${result.wasOptimized ? "" : ", kept original"})`,
    );
  }

  const totalSaved = totalInputSize - totalOutputSize;
  const totalPercent = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(1);

  console.log("");
  console.log(`Optimized ${results.length} images`);
  console.log(`Output directory: ${path.relative(ROOT_DIR, OUTPUT_DIR)}`);
  console.log(
    `Total: ${formatKilobytes(totalInputSize)} -> ${formatKilobytes(totalOutputSize)} (${totalPercent}% smaller, saved ${formatKilobytes(totalSaved)})`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
