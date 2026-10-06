// Runs before every dev/build. For each pet AND each item, makes one PNG
// per height in public/pets/<id>-<height>.png (or public/items/...) from
// the original uploaded image.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { HEIGHTS, RESIZE_STYLE } from '../src/config.mjs';

const root = process.cwd();
const configTime = fs.statSync(path.join(root, 'src/config.mjs')).mtimeMs;

const STYLES = ['hard-edge', 'smooth', 'crisp', 'pixel'];
let style = RESIZE_STYLE;
if (!STYLES.includes(style)) {
  console.warn(`⚠ RESIZE_STYLE "${style}" isn't one of ${STYLES.join(', ')}. Using 'smooth'.`);
  style = 'smooth';
}
const KERNELS = { smooth: 'lanczos3', crisp: 'linear', pixel: 'nearest' };

async function makeSize(src, height, out) {
  if (style === 'hard-edge') {
    const { height: srcH } = await sharp(src).metadata();
    if (srcH > height) {
      // Shrink smoothly to double size first (keeps thin lines connected),
      // then take hard-edged pixels down to the final size.
      const mid = Math.min(height * 2, srcH);
      let input = sharp(src);
      if (mid < srcH) {
        input = sharp(await input.resize({ height: mid, kernel: 'lanczos3' }).png().toBuffer());
      }
      await input.resize({ height, kernel: 'nearest' }).png().toFile(out);
      return;
    }
    // Image is already small: enlarging smoothly looks best.
    await sharp(src).resize({ height, kernel: 'lanczos3' }).png().toFile(out);
    return;
  }
  await sharp(src).resize({ height, kernel: KERNELS[style] }).png().toFile(out);
}

// Makes every size for every entry in one content folder (pets or items).
async function processCollection(label, contentDirName, outDirName) {
  const contentDir = path.join(root, 'src/content', contentDirName);
  const outDir = path.join(root, 'public', outDirName);
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter((f) => f.endsWith('.json')) : [];
  let made = 0;
  let skipped = 0;

  for (const file of files) {
    let entry;
    try {
      entry = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
    } catch (e) {
      console.warn(`⚠ Could not read ${contentDirName}/${file}: ${e.message}`);
      continue;
    }
    if (!entry.id || !entry.image) {
      console.warn(`⚠ ${contentDirName}/${file} is missing an id or image, skipping.`);
      continue;
    }
    const src = path.join(root, 'public', entry.image.replace(/^\//, ''));
    if (!fs.existsSync(src)) {
      console.warn(`⚠ Image not found for ${label} ${entry.id}: ${entry.image}`);
      continue;
    }
    const srcTime = Math.max(fs.statSync(src).mtimeMs, configTime);

    for (const h of HEIGHTS) {
      const out = path.join(outDir, `${entry.id}-${h}.png`);
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) {
        skipped++;
        continue;
      }
      await makeSize(src, h, out);
      made++;
    }
  }
  console.log(`${label} images (${style}): ${made} created, ${skipped} already up to date.`);
}

await processCollection('Pet', 'pets', 'pets');
await processCollection('Item', 'items', 'items');
