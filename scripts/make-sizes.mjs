// Runs before every dev/build. For each pet AND each item, makes one PNG
// per size in public/pets/<key>-<LABEL>.png (or public/items/...) from
// the original uploaded image.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { PET_SIZES, ITEM_DISPLAY_SIZE, ITEM_SECRET_SIZE, RESIZE_STYLE } from '../src/config.mjs';
import { sizeFilename } from '../src/sizes.mjs';

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

// Items have no "id" field (the item's name is its identity), so their
// picture files are named after the JSON filename Pages CMS already gave
// them, cleaned up to be safe in a URL.
function slugFromFilename(file) {
  const base = path.basename(file, '.json').toLowerCase().trim();
  return base.replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '') || 'item';
}

// Catches two sizes in the same list that would land on the same address
// (e.g. two both labeled "Official", or two with the same label). Each
// one would silently overwrite the other's file, so this warns loudly
// instead of leaving behind a confusing mix of pictures.
function checkForCollisions(label, sizes) {
  const seen = new Map();
  for (const size of sizes) {
    const suffix = sizeFilename('KEY', size.label);
    if (seen.has(suffix)) {
      console.warn(
        `⚠ ${label}: "${seen.get(suffix)}" and "${size.label}" both produce the same address ` +
        `(KEY${suffix.slice(3)}). Give one of them a different label in config.mjs, or they'll ` +
        `keep overwriting each other.`
      );
    } else {
      seen.set(suffix, size.label);
    }
  }
}
checkForCollisions('PET_SIZES', PET_SIZES);

// Makes every size for every entry in one content folder (pets or items).
async function processCollection(label, contentDirName, outDirName, sizes, getKey) {
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
    const key = getKey(entry, file);
    if (!key || !entry.image) {
      console.warn(`⚠ ${contentDirName}/${file} is missing its name/id or image, skipping.`);
      continue;
    }
    const src = path.join(root, 'public', entry.image.replace(/^\//, ''));
    if (!fs.existsSync(src)) {
      console.warn(`⚠ Image not found for ${label} "${key}": ${entry.image}`);
      continue;
    }
    const srcTime = Math.max(fs.statSync(src).mtimeMs, configTime);

    for (const size of sizes) {
      const out = path.join(outDir, sizeFilename(key, size.label));
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) {
        skipped++;
        continue;
      }
      await makeSize(src, size.height, out);
      made++;
    }
  }
  console.log(`${label} images (${style}): ${made} created, ${skipped} already up to date.`);
}

await processCollection('Pet', 'pets', 'pets', PET_SIZES, (entry) => entry.id);

// Items: the normal display picture, plus the unlinked "secret" one if
// that's turned on (height isn't 0) and doesn't collide with the display
// size's own address.
const itemSizes = [ITEM_DISPLAY_SIZE];
if (ITEM_SECRET_SIZE.height > 0) {
  if (sizeFilename('KEY', ITEM_SECRET_SIZE.label) === sizeFilename('KEY', ITEM_DISPLAY_SIZE.label)) {
    console.warn(
      `⚠ ITEM_SECRET_SIZE and ITEM_DISPLAY_SIZE have the same label ("${ITEM_DISPLAY_SIZE.label}"), ` +
      `so they'd overwrite the same file. Give ITEM_SECRET_SIZE its own label in config.mjs -- the ` +
      `secret picture was skipped this build.`
    );
  } else {
    itemSizes.push(ITEM_SECRET_SIZE);
  }
}
await processCollection('Item', 'items', 'items', itemSizes, (entry, file) => slugFromFilename(file));
