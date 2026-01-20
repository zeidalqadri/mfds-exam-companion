# MFDS Exam Companion - Development Context

**Last Updated**: 2026-01-20 3:10 PM
**Status**: Active - Production Deployed
**Repository**: https://github.com/zeidalqadri/mfds-exam-companion

## Current Implementation State

### What Was Built
A mobile-first React app for dental exam (MFDS/RCSE) practice with:
- 10 clinical stations across 2 exam days
- Verbatim question prompts from official scripts
- Check-off functionality for tracking asked questions
- Progress tracking per station
- 5 pastel color themes (Slate, Sage, Dusty Rose, Warm Gray, Seafoam)
- PWA-ready with mobile optimizations

### Tech Stack
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **Deployment**: Cloudflare Pages
- **Build Output**: `dist/` directory

## Key Decisions Made This Session

### 1. Theme System Architecture
- Used React Context (`ThemeContext`) for theme propagation
- Theme definitions stored as object with semantic color keys
- Switched from vibrant colors (navy/forest/burgundy) to pastel colors for better readability
- Neutral gray text (`text-gray-300`, `text-gray-400`) tested but reverted to tinted colors with opacity

### 2. Tailwind v4 Configuration
- Uses `@tailwindcss/vite` plugin instead of PostCSS plugin
- Import syntax: `@import "tailwindcss"` (not `@tailwind` directives)
- Config files use `.cjs` extension for CommonJS compatibility

### 3. Mobile Optimizations
- 44px minimum touch targets
- Swipe-from-left-edge to go back
- Safe area insets for notched phones
- Disabled text selection for smoother interaction

## Files Modified

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main component with all stations data, theme system, UI components |
| `src/index.css` | Tailwind imports + mobile CSS (tap highlight, safe areas) |
| `src/main.jsx` | React entry point |
| `index.html` | PWA meta tags, viewport settings |
| `public/manifest.json` | PWA manifest |
| `vite.config.js` | Vite + React + Tailwind plugins |
| `wrangler.json` | Cloudflare Pages config |

## Station Data Source

Questions extracted verbatim from DOCX files:
- `/Users/zeidalqadri/Downloads/MFDS day 1/` (6 stations)
- `/Users/zeidalqadri/Downloads/MFDS day 2/` (4 stations)

Used `pandoc` to convert DOCX to markdown for extraction.

## Production Deployment

### URLs
- **Production**: https://mfds-exam-companion.pages.dev
- **Branch alias**: https://master.mfds-exam-companion.pages.dev
- **Latest deployment**: https://33c984d7.mfds-exam-companion.pages.dev

### Deployment Commands
```bash
npm run build
wrangler pages deploy dist --project-name mfds-exam-companion --branch main
```

### Branch Configuration
- GitHub has both `master` and `main` branches
- Cloudflare Pages Production is tied to `main` branch
- Local development uses `master` branch
- Push to production: `git push origin master:main`

## Known Issues / Blockers

### CDN Caching
- Cloudflare CDN caches aggressively
- Direct deployment URLs (e.g., `https://33c984d7.mfds-exam-companion.pages.dev`) show latest immediately
- Main URL may take a few minutes to update

### Theme Readability
- Pastel themes have good readability now
- Initial tinted text colors (rose-300, teal-300) had poor contrast
- Settled on lighter tints with opacity for colored themes

## Next Steps

1. **Add theme persistence** - Save selected theme to localStorage
2. **Add search/filter** - Filter stations by keyword
3. **Add timer mode** - Practice with 10-minute station timers
4. **Offline support** - Service worker for full offline PWA

## Uncommitted Changes

None - all changes committed and pushed.

## Verification Commands

```bash
# Check production is updated
curl -s https://mfds-exam-companion.pages.dev | grep -o "Slate\|Sage\|Dusty"

# Deploy latest
npm run build && wrangler pages deploy dist --project-name mfds-exam-companion --branch main

# View deployment history
wrangler pages deployment list --project-name mfds-exam-companion
```
