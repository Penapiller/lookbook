// Runs before every dev/build. For each pet, makes one PNG per height in
// public/pets/<id>-<height>.png from the original uploaded image.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { HEIGHTS, RESIZE_KERNEL } from '../src/config.mjs';

const root = process.cwd();
const petsDir = path.join(root, 'src/content/pets');
const outDir = path.join(root, 'public/pets');
fs.mkdirSync(outDir, { recursive: true });

// Changing the settings file re-makes every size.
const configTime = fs.statSync(path.join(root, 'src/config.mjs')).mtimeMs;

const files = fs.existsSync(petsDir) ? fs.readdirSync(petsDir).filter((f) => f.endsWith('.json')) : [];
let made = 0;
let skipped = 0;

for (const file of files) {
  let pet;
  try {
    pet = JSON.parse(fs.readFileSync(path.join(petsDir, file), 'utf8'));
  } catch (e) {
    console.warn(`⚠ Could not read ${file}: ${e.message}`);
    continue;
  }
  if (!pet.id || !pet.image) {
    console.warn(`⚠ ${file} is missing an id or image, skipping.`);
    continue;
  }
  const src = path.join(root, 'public', pet.image.replace(/^\//, ''));
  if (!fs.existsSync(src)) {
    console.warn(`⚠ Image not found for pet ${pet.id}: ${pet.image}`);
    continue;
  }
  const srcTime = Math.max(fs.statSync(src).mtimeMs, configTime);

  for (const h of HEIGHTS) {
    const out = path.join(outDir, `${pet.id}-${h}.png`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) {
      skipped++;
      continue;
    }
    await sharp(src)
      .resize({ height: h, kernel: RESIZE_KERNEL }) // width follows automatically
      .png()
      .toFile(out);
    made++;
  }
}
console.log(`Pet images: ${made} created, ${skipped} already up to date.`);
