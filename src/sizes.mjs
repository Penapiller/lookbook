// Shared helpers for turning a size's label (e.g. "Small", "Official")
// into the text that goes into its web address. Used by the build
// script (scripts/make-sizes.mjs) and by the pet/item pages.

// A size labeled exactly "Official" or "Standard" (any mix of upper or
// lower case) drops its label from the address entirely, e.g.
// "pets/011.png" instead of "pets/011-Official.png".
const BLANK_LABELS = new Set(['official', 'standard']);

export function isBlankLabel(label) {
  return BLANK_LABELS.has(String(label ?? '').trim().toLowerCase());
}

// Turns a label into a safe chunk for a URL/file name, keeping its own
// capitalization: "Extra Large" -> "Extra-Large".
function sanitizeLabel(label) {
  return String(label ?? '')
    .trim()
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

// The bit that goes right after the ID/name in the address, including
// its leading dash -- or '' for a blank-label size.
export function sizeSuffix(label) {
  if (isBlankLabel(label)) return '';
  const safe = sanitizeLabel(label);
  return safe ? `-${safe}` : '';
}

// The full file name for one size of one pet/item.
export function sizeFilename(key, label) {
  return `${key}${sizeSuffix(label)}.png`;
}

// Picks the size whose height is closest to `target` (used to choose
// which picture shows large on a pet's own page).
export function closestSize(sizes, target = 500) {
  return sizes.reduce((best, s) => (Math.abs(s.height - target) < Math.abs(best.height - target) ? s : best), sizes[0]);
}

// Picks the smallest size (used for look-book thumbnails).
export function smallestSize(sizes) {
  return sizes.reduce((min, s) => (s.height < min.height ? s : min), sizes[0]);
}
