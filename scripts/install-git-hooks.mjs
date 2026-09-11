import { chmod, copyFile, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

const gitDir = join(process.cwd(), ".git");
if (!(await exists(gitDir))) process.exit(0);

const source = join(process.cwd(), ".githooks", "pre-commit");
const hooksDir = join(gitDir, "hooks");
const target = join(hooksDir, "pre-commit");

await mkdir(hooksDir, { recursive: true });
await copyFile(source, target);
await chmod(target, 0o755);

console.info("Installed .githooks/pre-commit");
