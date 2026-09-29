# Cine-Stream — Sprint 08

A small React + Vite media explorer implementing the Sprint 08 requirements:

- TMDB popular movies on first load
- Search against TMDB `/search/movie`
- 500ms search debounce
- Infinite scroll with native `IntersectionObserver`
- Append new pages instead of replacing the existing list
- Favorites persisted in `localStorage`
- `/favorites` route
- Native image lazy loading
- Missing-poster fallback
- Optional AI Mood Matcher -> one movie title -> TMDB search
- Responsive, intentionally simple UI suitable for an intern-built project

## Run locally

1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Add a TMDB Read Access Token to `VITE_TMDB_KEY`.
4. Run:

```bash
npm install
npm run dev
```

For the optional Mood Matcher on a Vercel deployment, set `OPENAI_API_KEY` in Vercel Environment Variables. The `/api/mood` function keeps the OpenAI key server-side.

## Required demo checks

Record a short demo showing:

1. Popular movies load.
2. Search typing does not fire a request for every keypress; wait 500ms after typing.
3. Scrolling to the sentinel loads another TMDB page and appends it.
4. Heart a movie, open Favorites, refresh, and show that it remains there.
5. If AI is configured, submit a mood and show the returned movie flowing into TMDB search.

## Notes

The code is deliberately split into small files rather than over-engineered abstractions. Before submitting, read each file and make any naming/style changes you normally use so the repository reflects your own understanding and debugging work.
