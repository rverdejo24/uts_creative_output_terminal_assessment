# Waypoint

A small Next.js site for career transitions: reflection prompts, a
Kanban-style goal tracker, and a curated resources page. Everything a
person enters (reflections, goal cards) is saved only in their own
browser's `localStorage` — there is no backend or database.

## Pages

- `/` — landing page
- `/reflect` — journaling prompts with an energy check-in and saved entries
- `/goals` — drag-and-drop Kanban board (Someday → This month → This week → Done)
- `/resources` — practical notes grouped by category

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- No external UI or state libraries — drag-and-drop uses the native
  HTML5 drag events, and persistence uses `window.localStorage` directly.

## Notes for extending it

- Design tokens (colors, fonts) live in `tailwind.config.ts`.
- Reflection prompts and resource content live in `lib/data.ts`
