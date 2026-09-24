// ═════════════════════════════════════════════════════════════════
//  SITE SETTINGS  —  the one file you edit to change how the site
//  looks. Change a value, click "Commit changes", and the site
//  rebuilds in a minute or two.
//
//  Rules: keep the quote marks ' ' around text, keep the commas at
//  the end of each line, and only change what's on the right of the
//  colon.
// ═════════════════════════════════════════════════════════════════


// ─── 1. BASICS ───────────────────────────────────────────────────
// Your site's address. This is put inside every BBCode link.
export const SITE_URL = 'https://domovoiden.species.workers.dev'.replace(/\/+$/, '');

export const SITE_NAME = 'Domovoi Den';
export const SITE_TAGLINE = 'A Closed Species by Penapiller';

// Text in the bar at the bottom of every page.
export const FOOTER_TEXT = `${SITE_NAME}. ${SITE_TAGLINE}.`;

// Paste your Discord invite link between the quotes.
// Leave it empty ('') to hide the Discord link from the nav bar.
export const DISCORD_URL = '';


// ─── 2. COLORS ───────────────────────────────────────────────────
// Every color on the site. Use hex codes like '#e77920'.
// (Search "color picker" to find hex codes.)
export const COLORS = {
  pageBackground: '#b8a27d', // behind everything (the stripes use their own colors, see section 4)
  boxBackground:  '#ffffff', // the white boxes that hold your content
  text:           '#47402e', // normal writing
  headings:       '#a35733', // big titles
  links:          '#a35733', // links inside text
  buttons:        '#a35733', // Copy buttons and highlights
  buttonText:     '#ffffff', // writing on the buttons
  bars:           '#e77920', // the header box and the footer bar
  barText:        '#33291a', // writing on those bars (keep it dark on a light bar)
  borders:        '#b8a27d', // thin lines around boxes
};


// ─── 3. HEADER IMAGE (replaces the site name at the top) ────────
// Upload your image to the "public/site" folder on GitHub, then put
// its file name here. If the file isn't found, the site name is
// shown as text instead.
export const HEADER = {
  image: '/site/header.png',
  width: 800,        // how wide it shows, in pixels (height follows automatically)
  colorBehind: false, // true = show the bar color behind the image (nice for transparent PNGs)
};


// ─── 4. BACKGROUND ───────────────────────────────────────────────
// style can be:  'stripes'  |  'solid'  |  'image'
export const BACKGROUND = {
  style: 'stripes',

  // for 'stripes'
  stripeColorA: '#b8a27d',
  stripeColorB: '#c9b896',
  stripeWidth: 36,   // thickness of each stripe, in pixels
  stripeAngle: 45,   // 0 = horizontal stripes, 90 = vertical, 45 = diagonal

  // for 'solid'
  solidColor: '#b8a27d',

  // for 'image' (upload it to public/site first)
  image: '/site/background.png',
  imageFit: 'repeat', // 'repeat' = tiles like wallpaper,  'cover' = one big picture
};


// ─── 5. NAV BAR ──────────────────────────────────────────────────
// The links under the header. Reorder, rename or add your own.
// A link with an empty address (like Discord above) is hidden.
export const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Look Book', href: '/lookbook' },
  { label: 'Discord',   href: DISCORD_URL, newTab: true },
];


// ─── 6. HOME PAGE ────────────────────────────────────────────────
// Upload the picture to "public/site", then put its file name here.
// If the file isn't found, the message simply takes the full width.
export const HOME = {
  image: '/site/promo.png',
  imageWidth: 320,   // in pixels (height follows automatically)
  title: 'Welcome to Domovoi Den',
  // One entry per paragraph. You can use <b>bold</b>, <i>italics</i>
  // and <a href="https://example.com">links</a>.
  message: [
    'This is the official look book for Domovoi Den. Every pet has its own page with copy-and-paste BBCode in several sizes.',
    'Open the <a href="/lookbook">Look Book</a> to browse every pet, or search by pet ID or artist.',
    'Replace this message with your own welcome, news, or rules.',
  ],
};


// ─── 7. PET IMAGES ───────────────────────────────────────────────
// Heights in pixels offered on each pet page. Width follows the pet.
export const HEIGHTS = [1000, 500, 280, 200];

// How pet images are shrunk to those sizes. Pick ONE style:
//   'hard-edge' = clean lines with crisp, stair-stepped edges. Thin lines stay intact.
//   'smooth'    = soft, blended edges.
//   'crisp'     = bilinear. A bit sharper than smooth, still blended.
//   'pixel'     = raw pixel picking. Very blocky; thin lines can break up.
export const RESIZE_STYLE = 'hard-edge';


