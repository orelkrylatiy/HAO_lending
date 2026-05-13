import path from "node:path";
import sharp from "sharp";

async function main() {
  const inputArg = process.argv[2];

  if (!inputArg) {
    console.error("Usage: node scripts/convert-to-webp.mjs <input-image>");
    process.exit(1);
  }

  const inputPath = path.resolve(process.cwd(), inputArg);
  const parsed = path.parse(inputPath);
  const outputPath = path.join(parsed.dir, `${parsed.name}.webp`);

  await sharp(inputPath).webp({ quality: 82 }).toFile(outputPath);
  console.log(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
