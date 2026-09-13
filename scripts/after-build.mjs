import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
// GitHub Pages serves this document at unknown paths, retaining the requested URL.
// Vite's absolute /Bappoz/ asset base lets the React 404 screen load at any depth.
await copyFile(
  new URL("../dist/index.html", import.meta.url),
  new URL("../dist/404.html", import.meta.url),
);

await mkdir(new URL("../dist/lab/", import.meta.url), { recursive: true });
const home = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const lab = home
  .replaceAll("Software & AI & Data Engineer", "Embedded Systems Lab")
  .replaceAll("Software &amp; AI &amp; Data Engineer", "Embedded Systems Lab")
  .replaceAll("portraits/lucas.webp", "lab/robot-arm.webp")
  .replace('content="#e4d7b0"', 'content="#151918"');
await writeFile(new URL("../dist/lab/index.html", import.meta.url), lab);
