// Creates web-optimised WebP copies of the original property photos.
// Originals in assets/originals are never modified.
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/originals";
const OUT = "public/images";
const SIZES = [{ suffix: "", width: 1600 }, { suffix: "-sm", width: 720 }];

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = path.parse(file).name;
  for (const { suffix, width } of SIZES) {
    const info = await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, `${name}${suffix}.webp`));
    console.log(`${name}${suffix}.webp`, info.width + "x" + info.height, Math.round(info.size / 1024) + "KB");
  }
}
