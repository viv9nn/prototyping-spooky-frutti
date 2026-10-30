# Spooky Frutti Arcade

A retro, early-2000s anime dating sim set in an arcade. Each entry in the hub's Chapter Select is a chapter of the story. Playing a game costs a heart, your scores decide how she feels about you, and the money you earn pays for the proposal.

Run it with `npm install`, then `npm run dev`, and open http://localhost:3000.

## The story

| # | Chapter | Slug | What it is |
| --- | --- | --- | --- |
| 1 | Dress to Impress | `dress-up` | Dress-up game |
| 2 | Hold It In | `first-date` | First date where you hold in a fart while talking |
| 3 | Late-Night TikTok | `phone` | Flick away risky notifications before Miss Oishii sees them |
| 4 | Odd Jobs | `job` | Earn the money that pays for the proposal |
| 5 | The Proposal | `proposal` | Finale. Plan five tasks, then watch the proposal unfold |

Chapter names are working titles. Change them in `lib/chapters.ts`.

## The rules

- **Hearts are lives.** Players start with 7: 1 for each of the 4 games, plus 3 spare retries. Playing a game costs 1 heart. The finale is free.
- **No getting stuck.** A retry is refused if it would use a heart needed for a game the player hasn't tried yet.
- **Best score counts.** A retry can only raise a chapter's score.
- **Money.** Earned in Odd Jobs and spent in The Proposal. Each heart buys one night of three hustles, and a refresh resumes the night.

## How the finale works

The player completes five tasks in order. Each task's game score is its **skill**, which sets how hard the task is and which options it unlocks:

| Task | Skill comes from |
| --- | --- |
| Buy a bouquet | Dress to Impress |
| Buy a ring | Odd Jobs |
| Book a dinner reservation | Hold It In |
| Rally your friends | Late-Night TikTok |
| Pick and book the proposal spot | The average of all four games |

| Skill | Difficulty | Options unlocked | Chance it goes wrong |
| --- | --- | --- | --- |
| Under 40 | Hard | Free option only | 50% |
| 40 to 69 | Normal | Free and mid-range | 25% |
| 70 or more | Easy | All three | 10% |

Then the player proposes and watches. Each task rolls for a mishap, and a task that goes wrong earns no points. **She says yes if the average game score plus the points from tasks that went smoothly is at least 70.** Proposing locks in her answer and ends the story until a new game. Every number here is a placeholder in `lib/proposalPlan.ts`, except the yes score, which is in `lib/proposal.ts`.

## Where the shared pieces live

| Piece | File |
| --- | --- |
| Chapter list | `lib/chapters.ts` |
| Scores and hearts charged per play | `lib/progress.ts` |
| Proposal rules: choosing, mishaps, her answer | `lib/proposal.ts` |
| Proposal tasks and options | `lib/proposalPlan.ts` |
| Hearts and money | `lib/wallet.ts` |
| Heart-charging start screen | `components/ChapterGate.tsx` |
| Header | `components/Header.tsx` |
| Arcade name | `lib/arcade.ts` |
| Hub (visual novel screen) | `components/Hub.tsx`, with art in `public/hub/` |
| "Coming soon" chapter page | `app/chapters/[slug]/page.tsx` |
| Colors and global styles | `app/globals.css` |

## Adding your chapter

Create `app/chapters/<your-slug>/page.tsx` using your slug from the table. It automatically replaces the "Coming soon" page. Wrap your game in `ChapterGate`, which shows the start screen, charges the heart, and turns away players who can't play:

```tsx
import ChapterGate from "@/components/ChapterGate";
import MyGame from "./MyGame";

export default function Page() {
  return (
    <ChapterGate slug="dress-up">
      <MyGame />
    </ChapterGate>
  );
}
```

Your game only starts once they've pressed start, so don't charge hearts yourself. When the player finishes, report a score from 0 to 100 from your client component. Show your own results screen afterward:

```tsx
"use client";
import { finishChapter } from "@/lib/progress";

finishChapter("dress-up", 85);
```

## Building Odd Jobs

Call `addMoney` with what the player earned, as well as `finishChapter`:

```tsx
import { addMoney } from "@/lib/wallet";

addMoney(250); // false, and changes nothing, if the amount isn't a positive whole number
```

The game itself is a plain HTML file, `public/games/side-hustle/index.html`, shown in a frame by `app/chapters/job/OddJobsGame.tsx`. One heart buys a night of 3 hustles. Each hustle's `rate` and the `SCORE_TARGET` constant in that file set what it pays and scores.

## Building the finale

Wrap The Proposal in `ChapterGate` with `slug="proposal"`. It costs no hearts and keeps players out until chapters 1 to 4 all have a score.

```tsx
"use client";
import { chooseOption, propose, useProposalPlan } from "@/lib/proposal";

const { steps, complete } = useProposalPlan();
// Each step has: id, name, skill, difficulty ("easy" | "normal" | "hard"), status
// ("done" | "current" | "upcoming"), chosen, and options. Each option has: id, name,
// price, points, unlocked, affordable.

chooseOption("ring", "silver-ring"); // charges money; false if it isn't allowed
                                     // picking again swaps and refunds the first

const outcome = propose();           // once complete is true. Play your cutscenes from this:
// outcome.beats:    one per step: { stepId, optionId, mishap }, in order
// outcome.affection and outcome.accepted: the final score and her answer
```

Use `difficulty` however you like inside each task. `propose()` also saves the outcome, and `useProposalResult().outcome` returns it after a refresh. Once the player has proposed, `ChapterGate` shows a "story is over" screen on the next visit, with a new game button.

## Testing without the other games

Run the dev server and open http://localhost:3000/dev to set fake scores, add money, pick the finale's options, propose, or reset your save. This page doesn't exist in production.

Saves live in the player's browser (localStorage), so they survive a refresh but aren't shared between devices.
