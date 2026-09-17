# Exhibition Download Center

**Explore. Learn. Download.**

The official digital download center for the exhibition — demonstration
video, application, and study materials, all in one place. Static site,
built to be hosted directly on GitHub Pages.

## Structure

```text
exhibition-download-center/
├── index.html
├── README.md
├── LICENSE
├── .gitignore
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/          → hero/poster images go here
│   └── icons/           → any extra icon assets
└── downloads/
    ├── exhibition-documentation.pdf     ← replace with the real file
    └── translation-study-material.pdf   ← replace with the real file
```

> The exhibition video and the `.exe` application are **not** stored in
> this repo — GitHub's 25 MB file limit rules that out for both. They're
> linked from Google Drive (or wherever you host the application)
> instead. See "Replacing placeholders" below.

## Replacing placeholders

1. **Video (hosted on Google Drive)** — GitHub blocks files over 25 MB, so
   the demonstration video is embedded from Google Drive instead of stored
   in this repo.
   - Upload the video to Google Drive and set sharing to **"Anyone with
     the link"** (Viewer access).
   - Copy the file ID out of the share link, e.g. from
     `https://drive.google.com/file/d/`**`1AbCdEfGhIjKlMnOp`**`/view`
   - In `index.html`, find the **Video** section and replace every
     occurrence of `YOUR_GOOGLE_DRIVE_FILE_ID` with that ID (three
     places: the `<iframe src>`, the "Open in Google Drive" link, and the
     "Download Video" link).
   - Update the `#meta-format`, `#meta-size`, and `#meta-duration` spans
     in the same section with the real values — Google Drive doesn't
     expose these to the page automatically.
2. **Application (hosted externally)** — `.exe` files can't be uploaded to
   this repo either, so the "View & Download Application" button links out
   to wherever you're hosting it (Google Drive, itch.io, a releases page,
   etc.).
   - In `index.html`, find the **Featured application** card and replace
     `YOUR_APPLICATION_FILE_ID` (or the whole `href`) with the real link.
   - If using Google Drive, the same "Anyone with the link" sharing step
     applies.
3. **PDFs** — these stay small enough for GitHub. Drop both study
   documents into `downloads/`, matching the filenames already referenced
   in `index.html`.
4. **Team names** — open `index.html` and search for `[Your Name]`,
   `[Group Member 0X]`, `[Supervisor / Lecturer]`, etc., and replace with
   real names.
5. **Quotes of the Day** — open `js/script.js` and find the `quotes`
   array near the top. Add as many `{ text: "...", author: "..." }`
   entries as you like — the Prev/Next buttons, the counter (e.g.
   "2 / 5"), and the automatic 10-second loop all pick this up
   automatically. The loop appears (and Prev/Next become visible) only
   once there are two or more quotes; it pauses while the tab is in the
   background or while a visitor is hovering the quote.

## Running locally

No build step is required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static server, e.g. `python3 -m http.server`,
  then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository **Settings → Pages**, set the source to the branch
   you pushed (e.g. `main`) and the root folder.
3. GitHub will publish the site at
   `https://<username>.github.io/<repository-name>/`.

All asset and download paths in `index.html` are relative, so the site
works whether it's served from a repository root or a project subpath.

## Notes

- No backend, login, or tracking of any kind — downloads work with plain
  `<a download>` links.
- The visual identity (metallic/gothic-tech seal, emerald and gold
  accents, Cinzel + Work Sans type pairing) is an original design and
  does not reproduce any copyrighted character art or branding.
- For academic and educational purposes.
