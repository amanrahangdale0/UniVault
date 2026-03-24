# UniVault: The Verified Student Portfolio

Hey there! Welcome to UniVault. We built this because we were honestly tired of seeing students do incredible work outside the classroom—winning hackathons, leading sports teams, volunteering, building side projects—and having no actual verified way to prove it.

Resumes are great, but they are static and unverified. LinkedIn is chaotic. We wanted a central, clean, and blazingly fast platform where students can log their achievements, faculty can verify them, and a beautiful portfolio is automatically generated.

## What it does

- **One Central Hub**: Drop your internships, hackathons, and academics here.
- **Verification Workflow**: Admins (faculty/evaluators) approve or reject entries so everything on your profile is legit.
- **Smart Scoring & AI**: The system auto-calculates a profile strength score and suggests exactly what you should do next (e.g., "You have no volunteer work, try adding some community service!").
- **Portfolio Generator**: One-click public view of all your verified badges.

## Tech Stack
- Frontend: React 18, Vite, TypeScript
- Styling: Tailwind CSS (Strict minimal Black & White theme), Framer Motion
- Backend: Firebase (Auth & Firestore)
- Deployed on: Vercel / Netlify (Production-ready)

## Quick Start
Since you're probably here to test it out, we made it frictionless. No need to sign up.

Just hit the demo buttons on the login page:
- **Demo Student**: Explores the dashboard, adds achievements, views AI suggestions.
- **Demo Admin**: Explores the admin panel, manages global users, approves/rejects student entries.

Or, literally type `admin@anything.com` into the login box. If your email contains "admin", the system will bypass auth and drop you in as an evaluator. (We added this just for you).

## Setup for Development
If you want to spin this up locally:

1. Clone it down.
2. Run `npm install`
3. Add your Firebase config to `.env.local`:
   ```bash
   VITE_FIREBASE_API_KEY="..."
   VITE_FIREBASE_AUTH_DOMAIN="..."
   VITE_FIREBASE_PROJECT_ID="..."
   VITE_FIREBASE_STORAGE_BUCKET="..."
   VITE_FIREBASE_MESSAGING_SENDER_ID="..."
   VITE_FIREBASE_APP_ID="..."
   ```
4. Run `npm run dev`

## Why it looks like this
We hate clutter. We stripped out all the neon gradients, heavy shadows, and "glassmorphism" that plagues modern web apps. It is pure monochrome black and white with subtle interactive geometry. We want the content to speak, not the UI container.

## Future Plans
- Automated PDF Resume Generation from verified entries.
- Direct institutional API integrations (e.g., pulling Canvas grades directly).
- Alumni network viewing modes.

---
_Made with strong coffee by Binary Brothers. © 2026_



