# AI Pair-Programming Log — Sprint 08

This file is a template for documenting AI-assisted learning/debugging. Replace the example entries with the prompts you actually used before submission.

## Session 1 — Infinite scroll
**Problem:** I needed to load the next TMDB page when the user reached the bottom without replacing the existing movies.

**Prompt:** Explain how IntersectionObserver can be used in React to trigger a page increment from a sentinel element, including how to avoid duplicate requests.

**What I changed:** I used a `ref` on a small sentinel div and guarded the observer callback with `loading` and `hasMore` state.

**What I learned:** The observer watches an element entering the viewport; it does not need a scroll event listener.

## Session 2 — Debouncing
**Problem:** Search should not send one request per keypress.

**Prompt:** Explain a simple 500ms debounce pattern in React and the cleanup required when the input changes quickly.

**What I changed:** I placed the timeout inside an effect and cleared the previous timeout in the cleanup function.

## Session 3 — Favorites
**Problem:** Favorite movies needed to survive a page refresh.

**Prompt:** Explain how to synchronize a React array with localStorage without creating an effect loop.

**What I changed:** I load once on startup and write whenever the favorites array changes.

## Session 4 — Debugging checklist
- Checked browser console for runtime errors.
- Checked Network tab for TMDB request count.
- Verified the request changes from popular to search mode.
- Verified page 2 is appended instead of replacing page 1.
- Verified localStorage after adding/removing a favorite.
- Tested a movie with a missing `poster_path`.

## Important
The internship instructions say to learn from AI rather than blindly copy code. Keep this file honest: add the real prompts, bugs, and fixes from your own sessions.
