# Halloween Look Book

A free, static look book for your closed species. Staff upload pets through a web form; the site rebuilds itself and every pet gets a page at `yoursite.com/PETID` with copy-and-paste BBCode.

## 1. Edit your details
Open `src/config.mjs` and change `SITE_URL`, `SITE_NAME` and `SITE_TAGLINE`.
(`SITE_URL` must match your real address, because it is put into the BBCode.)

## 2. Put it on GitHub
1. Make a free account at github.com and create a **new repository** (private is fine).
2. Upload everything in this folder to it (drag and drop works in the GitHub web page).

## 3. Host it on Cloudflare Pages (free)
1. Sign up at dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick your repository. Use these settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
3. Deploy. Your site appears at `something.pages.dev`.
4. To use your own domain: Pages project → **Custom domains**.

## 4. Staff upload form (Pages CMS, free)
1. Go to **app.pagescms.org** and sign in with GitHub.
2. Add your repository. The form comes from the `.pages.yml` file.
3. Invite staff to your GitHub repository (Settings → Collaborators). They sign in to Pages CMS with their own GitHub accounts.
4. To add a pet: **Pets → Add an entry**, fill in Pet ID and Artist, upload the image, save. The site updates in 1–2 minutes.

## Removing the sample pets
Delete the three files in `src/content/pets/` (100001–100003) and the three PNGs in `public/uploads/`.

## Sizes
Each pet is made in 1000, 500, 280 and 200 px tall (width follows the pet's shape).
Change the list in `src/config.mjs` (`HEIGHTS`). If you change a pet's image, the sizes regenerate on the next deploy.

## Running it on your own computer (optional)
Needs Node 20+. Run `npm install`, then `npm run dev`.
