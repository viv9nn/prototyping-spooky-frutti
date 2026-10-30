# Spooky Frutti Arcade

A retro, early-2000s anime dating sim set in an arcade. Each entry in the hub's Chapter Select is a chapter of the story, built as a mini-game, a story, or both. Players earn hearts and spend them in the gift shop.

Run it with `npm install`, then `npm run dev`, and open http://localhost:3000.

## Where the shared pieces live

| Piece | File |
| --- | --- |
| Chapter list | `lib/chapters.ts` |
| Heart wallet | `lib/wallet.ts` |
| Header | `components/Header.tsx` |
| Arcade name | `lib/arcade.ts` |
| Hub (visual novel screen) | `app/page.tsx`, with art in `public/hub/` |
| Side Hustle mini-game | `app/chapters/side-hustle/page.tsx`, with the game in `public/games/side-hustle/` |
| "Coming soon" chapter page | `app/chapters/[slug]/page.tsx` |
| Gift shop | `app/shop/page.tsx` |
| Colors and global styles | `app/globals.css` |

## Adding your chapter

1. Change your placeholder in `lib/chapters.ts` to your chapter's name and slug.
2. Create `app/chapters/<your-slug>/page.tsx`. It automatically replaces the "Coming soon" page for that chapter.
3. Award hearts from a client component:

```tsx
"use client";
import { addHearts, spendHearts, useHearts } from "@/lib/wallet";

const hearts = useHearts();  // current count, updates automatically
addHearts(10);               // true, or false if the amount isn't a positive whole number
spendHearts(5);              // true, or false if there aren't enough hearts
```

Hearts are saved in the player's browser (localStorage), so they survive a refresh but aren't shared between devices.

Side Hustle is a plain HTML game in a frame. It reads and writes the same `arcade-hearts` key as `lib/wallet.ts`, so its winnings and losses show up everywhere on the site. Its `HEART_RATE` constant sets how many hearts its hustles pay.
