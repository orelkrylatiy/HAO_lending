import { execFileSync, spawnSync } from "node:child_process";

const FORMATTABLE = /\.(?:[cm]?[jt]sx?|json|css|md|ya?ml)$/i;

function stagedFiles() {
  const output = execFileSync(
    "git",
    ["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"],
    { encoding: "utf8" },
  );

  return output.split("\0").filter(Boolean).filter((file) => FORMATTABLE.test(file));
}

const files = stagedFiles();
if (files.length === 0) process.exit(0);

const prettier = spawnSync("npx", ["--yes", "prettier@3.6.2", "--write", "--", ...files], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (prettier.status !== 0) process.exit(prettier.status ?? 1);

execFileSync("git", ["add", "--", ...files], { stdio: "inherit" });
