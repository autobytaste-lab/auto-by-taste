# External Integrations

**Analysis Date:** 2026-03-07

## APIs & External Services

**Google Gemini API (Prepared):**
- Service: Google Gemini - AI API for potential future integrations
- SDK/Client: Native fetch API (not currently used in components)
- Auth: Environment variable `GEMINI_API_KEY`
- Status: Configured but not actively integrated in current codebase
- Config: Exposed via Vite in `vite.config.ts` as `process.env.GEMINI_API_KEY`

**Social/Communication Integrations:**
- Zalo - Messaging platform
  - Links: `https://zalo.me/0337776435`
  - Used in: `components/Navbar.tsx`, `components/Footer.tsx`, `App.tsx`
  - Purpose: Founder contact/chat functionality

- WhatsApp - Messaging platform
  - Links: `https://wa.me/84337776435`
  - Used in: `components/Footer.tsx`
  - Purpose: Founder contact

- Icons8 API - Icon CDN
  - Links: `https://img.icons8.com/color/48/zalo.png`
  - Used in: `App.tsx`
  - Purpose: Zalo icon asset

## Data Storage

**Databases:**
- None detected - No backend database integration

**File Storage:**
- Vercel Blob Storage
  - URLs: `https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com`
  - Used in: `components/Hero.tsx`, `components/ProblemSolution.tsx`
  - Purpose: Hosting generated AI images
  - Files stored:
    - `media/gemini_generated_image_3lbbj3lbbj3lbbj3_1769612732090.png`
    - `media/gemini_generated_image_3mlypz3mlypz3mly_1769612846736.png`

**Caching:**
- None detected

## Authentication & Identity

**Auth Provider:**
- None detected - Application is static marketing site

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Console only - No centralized logging configured

## CI/CD & Deployment

**Hosting:**
- Not specified in codebase - Deployment target not documented

**CI Pipeline:**
- Not detected - No CI configuration files found

## Environment Configuration

**Required env vars:**
- `GEMINI_API_KEY` - Google Gemini API authentication key (prepared but not actively used)

**Secrets location:**
- `.env.local` file - Local environment variables (not committed to git, listed in `.gitignore`)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Contact links only: Zalo and WhatsApp external links in UI

## Asset Sources

**Content Delivery:**
- Google Fonts API - Inter font family: `https://fonts.googleapis.com/css2?family=Inter...`
- Tailwind CSS CDN - Styling: `https://cdn.tailwindcss.com`
- Vercel Blob Storage - Generated images (see File Storage section)
- Icons8 CDN - Icon assets: `https://img.icons8.com/`

## Notes

This is a static marketing landing page with no active backend integrations. The Google Gemini API key is configured in the environment but not currently used in the codebase. External integrations are limited to asset delivery (fonts, CSS, images) and social contact links.

---

*Integration audit: 2026-03-07*
