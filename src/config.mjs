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
export const SITE_TAGLINE = 'Website build by Penapiller';

// Text in the bar at the bottom of every page.
export const FOOTER_TEXT = `${SITE_NAME}. ${SITE_TAGLINE}.`;

// Paste your Discord invite link between the quotes.
// Leave it empty ('') to hide the Discord link from the nav bar.
export const DISCORD_URL = '';

// Picture shown when someone shares a link to your home page, look book,
// items page or rules page on Discord or social media (pet and item pages
// use their own picture automatically). Upload it to "public/site".
// Leave the file missing and this is simply skipped.
export const SITE_PREVIEW_IMAGE = '/site/preview.png';

// The little icon shown in the browser tab.
//   - To use your own picture: upload a small square image to
//     "public/site" (name it anything, e.g. "favicon.png") and put its
//     file name below. Works best as a simple, square image -- 64x64px
//     or so is plenty; anything bigger just gets shrunk by the browser.
//   - To use an emoji instead, leave "image" as '' and put any single
//     emoji in "emoji" (the default is a jack-o'-lantern).
export const FAVICON = {
  image: '',
  emoji: '🎃',
};


// ─── 2. COLORS ───────────────────────────────────────────────────
// Every color on the site. Use hex codes like '#e77920'.
// (Search "color picker" to find hex codes.)
export const COLORS = {
  pageBackground: '#b8a27d', // behind everything (the stripes use their own colors, see section 4)
  boxBackground:  '#ffffff', // the white boxes that hold your content
  text:           '#47402e', // normal writing
  headings:       '#A35733', // big titles
  links:          '#a35733', // links inside text
  buttons:        '#a35733', // Copy buttons and highlights
  buttonText:     '#ffffff', // writing on the buttons
  bars:           '#e77920', // the header box and the footer bar
  barText:        '#33291a', // writing on those bars (keep it dark on a light bar)
  borders:        '#f2e2cb', // thin lines around boxes
};


// ─── 3. HEADER IMAGE (replaces the site name at the top) ────────
// Upload your image to the "public/site" folder on GitHub, then put
// its file name here. If the file isn't found, the site name is
// shown as text instead.
export const HEADER = {
  image: '/site/header.png',
  width: 875,        // how wide it shows, in pixels (height follows automatically)
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


// ─── 5. PAGES ────────────────────────────────────────────────────
// Turn whole pages on or off. true = on, false = off.
// A page that's off also disappears from the nav bar below, and its
// address shows a short "not available" message instead of an error.
// (Home and the pet Look Book are always on.)
export const PAGES = {
  items:   true, // the /items look book
  rules:   false, // the /rules page
  artists: false, // the /artists page
};


// ─── 6. NAV BAR ──────────────────────────────────────────────────
// The links under the header. Reorder or rename the ones that are
// always shown. Items, Rules and Artists come from the PAGES
// settings above and disappear on their own when turned off.
// A link with an empty address (like Discord) is hidden too.
export const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Look Book', href: '/lookbook' },
  ...(PAGES.items   ? [{ label: 'Items',   href: '/items' }]   : []),
  ...(PAGES.rules   ? [{ label: 'Rules',   href: '/rules' }]   : []),
  ...(PAGES.artists ? [{ label: 'Artists', href: '/artists' }] : []),
  { label: 'Discord',   href: DISCORD_URL, newTab: true },
];


// ─── 7. HOME PAGE ────────────────────────────────────────────────
// Upload the picture to "public/site", then put its file name here.
// If the file isn't found, the message simply takes the full width.
export const HOME = {
  image: '/site/promo.png',
  imageWidth: 320,   // in pixels (height follows automatically)
  title: 'Welcome to Domovoi Den',
  // One entry per paragraph. You can use <b>bold</b>, <i>italics</i>
  // and <a href="https://example.com">links</a>.
  message: [
    '<i> Born when the veil is thin, Domovoi are small trickster spirits closely related to the fae. Unpredictable by nature, and unbound by human customs, they often play by their own rules.',  ' If encountered, a sweet treat or shiny object may win their favor... Sometimes. </i>',
 '<b>This website is still being worked on. Please check the ChickenSmoothie Page for the most up-to-date info. Thank you.</b>' ],
};


// ─── 8. RULES PAGE ───────────────────────────────────────────────
// The /rules page. It looks like the home page: a white panel with an
// optional picture, a title, and your text, broken into as many
// sections as you like.
export const RULES = {
  // Optional picture next to the title. Upload to "public/site", or
  // leave this pointing at a file that doesn't exist to hide it.
  image: '/site/rules.png',
  imageWidth: 260,

  title: 'Species Rules',

  // Add, remove or reorder sections freely. "heading" can be left as
  // '' to show a section with no sub-heading. Each paragraph in
  // "body" can use <b>bold</b>, <i>italics</i> and
  // <a href="https://example.com">links</a>, same as the home page.
  sections: [
    {
      heading: 'General Rules',
      body: [ ' <b>You must follow these rules to participate. Failure to follow these rules may result in a ban on participation and/or revocation of adopts. These rules and terms may change from time to time. By participating in this UMA, you acknowledge this and agree to follow all rules, both current and future. The owner reserves the right to take any disciplinary action at any time, for any reason. Listed or otherwise.</b>',
  '✦ Follow all site rules at all times.',
  '✦ Behavior that breaks the spirit of the ARPG will not be tolerated.',
  '✦ Do not edit, trace, alter, or create your own Domovoi.',
  '✦ Your account must be 2 months old or older to play/own Domovoi.',
  '✦ Please keep track of your Domovoi. You must have an up-to-date Co-Op post to play. You have 30 days to add your owned Domovoi to your Co-op before you risk them being rehomed.',
  '✦ You must have direct permission to transfer out of Domovoi.',
  '✦ Domovoi may not be traded for anything other than other Domovoi, Domovoi items, or Domovoi currency at this time.',
  '✦ Domovoi are defined as characters created using the official line arts; if you wish to transfer out of the species, you need permission from the owner and the character designer. If approved, you may no longer use or display the official line arts.', ],
    },
    {
      heading: 'Art & Customs',
      body: [
        'Write your art and customization rules here.',
      ],
    },
    {
      heading: 'Trading & Selling',
      body: [
        'Write your trading and selling rules here.',
      ],
    },
  ],
};


// ─── 9. PET TRAITS ───────────────────────────────────────────────
// An optional second box on pet pages, below Information, for listing
// a pet's traits. If a pet's Traits field is left blank in Pages CMS,
// the box just doesn't show up for that pet -- same as Information.
//
// Setting this to false hides the Traits box on every pet page, even
// for pets that have something typed into their Traits field. It does
// NOT remove the Traits field from the Pages CMS upload form itself --
// staff can still fill it in, the site just won't display it while
// this is off. (To remove the field from the CMS form entirely, see
// the "traits" field in .pages.yml and delete that block.)
export const SHOW_TRAITS = true;


// ─── 10. PET IMAGE SIZES ────────────────────────────────────────────
// Each entry below is one size offered to copy as BBCode on a pet's
// page, and sets that picture's web address:
//   yoursite.com/pets/PETID-LABEL.png
// "height" is the actual picture size made, in pixels -- width follows
// the pet's own shape. "label" is both what's shown in the size list
// AND what goes into the address, so change it any time you like; the
// coder (that's you!) picks the words.
//
// List them in whatever order you want them to appear on the page.
//
// Give exactly ONE size the label "Official" or "Standard" (capitals
// don't matter) and that size's address drops the label entirely:
//   yoursite.com/pets/PETID.png
// Don't give two sizes that same label -- they'd fight over the one
// blank address and the build will warn you if that happens.
export const PET_SIZES = [
  { label: 'Huge',     height: 1000 },
  { label: 'Large',    height: 500 },
  { label: 'Standard', height: 280 },
  { label: 'Small',    height: 200 },
];


// ─── 11. ITEM IMAGE SIZES ───────────────────────────────────────────
// The one picture shown on an item's page (items don't have a size
// list to copy from, like pets do). Same label rules as PET_SIZES
// above apply -- "Official"/"Standard" drops the label from the address.
export const ITEM_DISPLAY_SIZE = { label: 'Display', height: 500 };

// How wide that picture actually shows on the item's page, in pixels.
// (This is separate from the height above -- that's the size of the
// picture file itself; this is just how big it displays.)
export const ITEM_IMAGE_DISPLAY_WIDTH = 220;

// A second, smaller picture also made for every item, at its own
// address using this label -- e.g. yoursite.com/items/item-name-Secret.png.
// It's never linked to anywhere on the site itself (not on the item's
// page, not in the look book), so an ordinary visitor browsing the
// site will never come across it. Useful for things like a hidden
// stamp or code for an event.
//
// Heads up: this only makes the picture un-LINKED, not truly secret.
// The address still follows the exact same "item-name-LABEL.png"
// pattern as every other item picture, so anyone who already knows
// that pattern could type the right address in and find it. If you
// need it to be genuinely hard to guess, say so and it can be changed
// to use a random code in the address instead of a chosen label.
//
// Set height to 0 to turn this off completely (no picture gets made).
export const ITEM_SECRET_SIZE = { label: 'Icon', height: 75 };


// ─── 12. HOW IMAGES ARE RESIZED ─────────────────────────────────────
// How pet and item images are shrunk down to all the sizes above. Pick ONE style:
//   'hard-edge' = clean lines with crisp, stair-stepped edges. Thin lines stay intact.
//   'smooth'    = soft, blended edges.
//   'crisp'     = bilinear. A bit sharper than smooth, still blended.
//   'pixel'     = raw pixel picking. Very blocky; thin lines can break up.
export const RESIZE_STYLE = 'hard-edge';


