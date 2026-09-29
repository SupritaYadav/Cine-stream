# Sprint 08 Submission Checklist

## Before recording
- [ ] `npm install` completes.
- [ ] `.env` contains `VITE_TMDB_KEY`.
- [ ] `npm run dev` opens the app.
- [ ] Popular movies are visible.
- [ ] Search works after a 500ms pause.
- [ ] Scrolling loads page 2 and appends it.
- [ ] Heart adds/removes favorites.
- [ ] `/favorites` displays saved items.
- [ ] Refreshing `/favorites` keeps saved items.
- [ ] Poster-less movie does not break the grid.
- [ ] Network tab shows no request for every search keystroke.
- [ ] If Phase 3 is enabled, Vercel has `OPENAI_API_KEY` configured.

## 3-minute demo order
1. Open Discover and point out the movie grid.
2. Type a movie name quickly; wait for the debounce.
3. Show the Network tab and explain that the request happens after typing stops.
4. Scroll to the bottom; show the next page being appended.
5. Heart two movies.
6. Open Favorites.
7. Refresh and show that the list remains.
8. If configured, type a mood such as `I want something light and funny` and show the AI title being sent into TMDB search.
