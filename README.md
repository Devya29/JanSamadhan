# जनसमाधान · Jansamadhan

**Civic Problem Intelligence Platform** — a frontend for turning fragmented citizen
complaints into prioritized, actionable civic issues for local authorities.

Citizens report problems (water supply, potholes, garbage, streetlights, drainage,
etc.). The platform groups related complaints into a single **civic issue**, scores
it for priority, and gives authorities a dashboard to assign, track, and resolve it —
while citizens can follow progress and confirm whether a fix actually worked.

This is a **frontend-only** build. All data (complaints, issues, users, analytics)
is mock data served through a local service layer in `src/services`, so the UI is
fully interactive and demoable without a backend. The service layer is written so
it can be swapped for real API calls later without redesigning the UI — see the
`TODO` comments in `src/services/*.js` and `src/pages/Login.jsx`.

## Tech stack

- React 19 (plain JavaScript / JSX — no TypeScript)
- Vite 8
- Tailwind CSS v4
- React Router 7
- lucide-react icons

## Getting started

**Requirements:** Node.js 18+ (Node 22 recommended) and npm (or pnpm/yarn if you prefer).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```




## Notes on the mock backend

Look for `TODO` comments across `src/services/` and `src/pages/Login.jsx` — they
mark every spot where a real backend (auth, database, AI grouping/priority
scoring) would replace the current mock logic.
