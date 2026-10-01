# AI Pair-Programming Log — Sprint 08

This file is a template for documenting AI-assisted learning/debugging. 

## Prompt 1 — Infinite scroll
**Problem:** I needed to load the next TMDB page when the user reached the bottom without replacing the existing movies.

**Prompt:** Explain how IntersectionObserver can be used in React to trigger a page increment from a sentinel element, including how to avoid duplicate requests.


## Prompt 2 — Debouncing
**Problem:** Search should not send one request per keypress.

**Prompt:** Explain a simple 500ms debounce pattern in React and the cleanup required when the input changes quickly.


## Prompt 3 — Favorites
**Problem:** Favorite movies needed to survive a page refresh.

**Prompt:** Explain how to synchronize a React array with localStorage without creating an effect loop.


## Prompt 4 — Debugging checklist
- Checked browser console for runtime errors.
- Checked Network tab for TMDB request count.
- Verified the request changes from popular to search mode.
- Verified page 2 is appended instead of replacing page 1.
- Verified localStorage after adding/removing a favorite.
- Tested a movie with a missing `poster_path`.

