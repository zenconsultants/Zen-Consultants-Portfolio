import { copyFile, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(rootDir, "dist");
const docsDir = resolve(rootDir, "docs");

await mkdir(distDir, { recursive: true });
await copyFile(resolve(distDir, "index.html"), resolve(distDir, "404.html"));
await copyFile(resolve(distDir, "index.html"), resolve(distDir, "apply.html"));
await copyFile(resolve(rootDir, "CNAME"), resolve(distDir, "CNAME"));
await writeFile(resolve(distDir, ".nojekyll"), "");

await rm(docsDir, { recursive: true, force: true });
await cp(distDir, docsDir, { recursive: true });
