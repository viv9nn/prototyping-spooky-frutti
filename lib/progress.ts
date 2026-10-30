"use client";

import { chapters, getChapter } from "@/lib/chapters";
import { createStore, parseObject } from "@/lib/store";
import { getHearts, spendHearts, useHearts } from "@/lib/wallet";

export type Scores = Record<string, number>;

const store = createStore<Scores>("arcade-scores", {}, parseObject<Scores>);

// Chapters the player has paid a heart for but not finished. Coming back to one
// is free, so a refresh or a closed tab doesn't cost another heart.
const startedStore = createStore<string[]>("arcade-started", [], (raw) => {
  try {
    const saved = JSON.parse(raw);
    return Array.isArray(saved) ? saved : null;
  } catch {
    return null;
  }
});

// What pressing start on a chapter would do:
// "free"     the finale, which costs nothing
// "locked"   the finale, before chapters 1 to 4 all have a score
// "continue" already paid for, costs nothing
// "first"    first try, costs 1 heart
// "retry"    another try, costs 1 heart
// "blocked"  a retry the player can't afford
// "finished" the player has proposed, so the story is over until a new game
export type PlayStatus = "free" | "locked" | "continue" | "first" | "retry" | "blocked" | "finished";

const games = chapters.filter((chapter) => !chapter.isFinale);
const finale = chapters.find((chapter) => chapter.isFinale);

function getPlayStatuses(hearts: number, scores: Scores, started: string[]) {
  const isUnpaid = (slug: string) => scores[slug] === undefined && !started.includes(slug);
  const heartsNeeded = games.filter((game) => isUnpaid(game.slug)).length;
  const ready = games.every((game) => scores[game.slug] !== undefined);
  const proposed = finale !== undefined && scores[finale.slug] !== undefined;

  const statuses: Record<string, PlayStatus> = {};
  for (const { slug, isFinale } of chapters) {
    if (proposed) statuses[slug] = "finished";
    else if (isFinale) statuses[slug] = ready ? "free" : "locked";
    else if (started.includes(slug)) statuses[slug] = "continue";
    else if (isUnpaid(slug)) statuses[slug] = hearts > 0 ? "first" : "blocked";
    else statuses[slug] = hearts > heartsNeeded ? "retry" : "blocked";
  }
  return statuses;
}

function getStatus(slug: string) {
  return getPlayStatuses(getHearts(), store.get(), startedStore.get())[slug];
}

// React hook: the PlayStatus of every chapter, by slug.
export function usePlayStatuses() {
  return getPlayStatuses(useHearts(), store.useValue(), startedStore.useValue());
}

// Charges the heart for a play, if one is due. Returns false if the player can't
// play. ChapterGate calls this, so chapters don't need to.
export function startChapter(slug: string) {
  const status = getStatus(slug);
  if (status === "first" || status === "retry") {
    spendHearts(1);
    startedStore.set([...startedStore.get(), slug]);
    return true;
  }
  return status === "continue" || status === "free";
}

// Call this when a player finishes your game, with a score from 0 to 100.
// Only the player's best score is kept. The finale ends through propose() instead.
// Returns false, and changes nothing, if the slug or score is invalid or the story is over.
export function finishChapter(slug: string, score: number) {
  const chapter = getChapter(slug);
  if (!chapter || chapter.isFinale || !Number.isInteger(score) || score < 0 || score > 100) return false;
  if (getStatus(slug) === "finished") return false;

  const scores = store.get();
  const best = scores[slug];
  if (best === undefined || score > best) store.set({ ...scores, [slug]: score });
  startedStore.set(startedStore.get().filter((started) => started !== slug));
  return true;
}

// True while the finale is open: chapters 1 to 4 are scored and she hasn't been asked.
export function canPlan() {
  return finale !== undefined && getStatus(finale.slug) === "free";
}

// Records the finale's score, which ends the story. Only propose() should call this.
export function recordFinale(score: number) {
  if (finale) store.set({ ...store.get(), [finale.slug]: score });
}

// Clears all scores. To start a new game, use resetProgress() from lib/proposal.ts.
export function resetScores() {
  store.set({});
  startedStore.set([]);
}

export function getScores() {
  return store.get();
}

// React hook: the player's best score per chapter slug. Unplayed chapters are missing.
export const useScores = store.useValue;

// The average score across the games. Unplayed games count as 0.
export function averageGameScore(scores: Scores) {
  const total = games.reduce((sum, game) => sum + (scores[game.slug] ?? 0), 0);
  return Math.round(total / games.length);
}

// True once every game has a score.
export function allGamesPlayed(scores: Scores) {
  return games.every((game) => scores[game.slug] !== undefined);
}
