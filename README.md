# ZebraGuide 🦓
**hEDS Self-Assessment & Doctor Advocacy Tool**

A mobile-first web app helping patients with hypermobile Ehlers-Danlos Syndrome (hEDS) complete a structured self-assessment using the 2017 International Classification criteria, generate a clinical summary letter for their physician, find PT and bracing resources, and track symptoms over time.

---

## Getting started locally

You need [Node.js](https://nodejs.org) (v18+) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Deploying to Vercel (recommended)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Vercel will auto-detect Vite — just click **Deploy**
4. Your app will be live at `https://your-project.vercel.app`

No configuration needed. Every push to `main` will auto-deploy.

---

## Deploying to Netlify

```bash
# Build the app
npm run build

# Then drag the `dist/` folder to netlify.com/drop
```

Or connect your GitHub repo in the Netlify dashboard for continuous deployment.

---

## Project structure

```
zebra-guide/
├── index.html          # App shell + meta tags
├── vite.config.js      # Vite config
├── package.json
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # Full application (single-file)
```

---

## Features

- **Symptom Checker** — 2017 hEDS criteria (Beighton score, connective tissue signs, family history, chronic pain) + validated questionnaires: BPI, POTS screening, MCAS screening, FSS fatigue scale
- **Doctor Toolkit** — Auto-generates a clinical summary letter with scoring, diagnostic indicators, and suggested referrals
- **PT & Bracing Guide** — Curated resources for physiotherapy and orthotic support
- **Flare Tracker** — Log and review symptom flares over time (stored locally in browser)

---

## Beighton test images (important before going live)

The app currently loads Beighton illustration images from the EDS Society's CDN. These may be blocked by hotlink protection on a deployed domain. To self-host them:

1. Save the 5 images from `https://www.ehlers-danlos.com/assessing-joint-hypermobility/` into `public/beighton/` with these exact filenames:
   - `pinkies.jpg`
   - `thumb.jpg`
   - `elbows.jpg`
   - `knees.jpg`
   - `trunk.jpg`

2. Open `src/App.jsx` and change line ~87 to:
   ```js
   const USE_LOCAL_IMAGES = true;
   ```

3. Confirm usage is permitted with the EDS Society before publishing (their content is generally available for educational non-commercial use, but written confirmation is best practice).

If images fail to load, the app shows a friendly fallback placeholder — the step-by-step text instructions remain fully functional.

---

## Medical disclaimer

ZebraGuide is a self-advocacy tool based on the 2017 International Classification of EDS (Malfait et al.). It is not a diagnostic service. Formal hEDS diagnosis requires clinical examination by a qualified clinician. No causative gene for hEDS has been identified; genetic testing does not confirm or exclude hEDS.

---

## Reference

Malfait F, Francomano C, Byers P, et al. (2017). The 2017 international classification of the Ehlers-Danlos syndromes. *Am J Med Genet C.* 175(1):8–26.
