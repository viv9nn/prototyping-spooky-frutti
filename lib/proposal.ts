"use client";

import {
  allGamesPlayed,
  averageGameScore,
  canPlan,
  getScores,
  recordFinale,
  resetScores,
  useScores,
  type Scores,
} from "@/lib/progress";
import {
  DIFFICULTY_SKILL,
  MISHAP_CHANCE,
  proposalPlan,
  type Difficulty,
  type PlanStep,
} from "@/lib/proposalPlan";
import { createStore, parseObject } from "@/lib/store";
import { addMoney, getMoney, resetWallet, spendMoney, useMoney } from "@/lib/wallet";

// The affection she says yes at: the average game score plus points from each
// step that goes smoothly in the cutscenes.
export const YES_SCORE = 70;

// One moment of the cutscenes: what the player picked and whether it went wrong.
export type CutsceneBeat = { stepId: string; optionId: string; mishap: boolean };

export type ProposalOutcome = { beats: CutsceneBeat[]; affection: number; accepted: boolean };

type Choices = Record<string, string>; // the chosen option id per step id

const choicesStore = createStore<Choices>("arcade-proposal-choices", {}, parseObject<Choices>);
const outcomeStore = createStore<ProposalOutcome | null>(
  "arcade-proposal-outcome",
  null,
  parseObject<ProposalOutcome>,
);

function skillFor(step: PlanStep, scores: Scores) {
  const total = step.drivenBy.reduce((sum, slug) => sum + (scores[slug] ?? 0), 0);
  return Math.round(total / step.drivenBy.length);
}

function difficultyFor(skill: number): Difficulty {
  if (skill >= DIFFICULTY_SKILL.easy) return "easy";
  return skill >= DIFFICULTY_SKILL.normal ? "normal" : "hard";
}

function buildPlan(choices: Choices, scores: Scores, money: number) {
  const currentIndex = proposalPlan.findIndex((step) => !choices[step.id]);
  const steps = proposalPlan.map((step, index) => {
    const skill = skillFor(step, scores);
    const chosen = step.options.find((option) => option.id === choices[step.id]);
    return {
      ...step,
      skill, // 0 to 100, from the games this step is tied to
      difficulty: difficultyFor(skill),
      chosen,
      // "done" and "current" steps can be picked from. "upcoming" ones can't yet.
      status: chosen ? "done" : index === currentIndex ? "current" : "upcoming",
      options: step.options.map((option) => ({
        ...option,
        unlocked: skill >= option.minSkill,
        // A swap refunds the current choice, so only the difference has to be affordable.
        affordable: option.price - (chosen?.price ?? 0) <= money,
      })),
    };
  });
  return { steps, complete: currentIndex === -1 };
}

// React hook: the finale's checklist, including each step's skill, difficulty,
// status, and which options are unlocked and affordable.
export function useProposalPlan() {
  return buildPlan(choicesStore.useValue(), useScores(), useMoney());
}

// Picks an option for a step, charging its price. Picking again swaps the option and
// refunds the first. Returns false, and changes nothing, if the finale isn't open,
// an earlier step is still unpicked, or the option is locked or unaffordable.
export function chooseOption(stepId: string, optionId: string) {
  if (!canPlan()) return false;

  const choices = choicesStore.get();
  const step = buildPlan(choices, getScores(), getMoney()).steps.find((s) => s.id === stepId);
  const option = step?.options.find((o) => o.id === optionId);
  if (!step || !option || step.status === "upcoming" || !option.unlocked) return false;

  const cost = option.price - (step.chosen?.price ?? 0);
  if (cost > 0 && !spendMoney(cost)) return false;
  if (cost < 0) addMoney(-cost);
  choicesStore.set({ ...choices, [stepId]: optionId });
  return true;
}

// Call this when the player proposes. It rolls for mishaps, locks in her answer, and
// ends the story, so play your cutscenes from what it returns. Returns null if the
// finale isn't open or a step is still unpicked.
export function propose(random: () => number = Math.random) {
  const scores = getScores();
  const { steps, complete } = buildPlan(choicesStore.get(), scores, getMoney());
  if (!canPlan() || !complete) return null;

  let affection = averageGameScore(scores);
  const beats: CutsceneBeat[] = steps.map((step) => {
    const mishap = random() < MISHAP_CHANCE[step.difficulty];
    if (!mishap) affection += step.chosen?.points ?? 0;
    return { stepId: step.id, optionId: step.chosen?.id ?? "", mishap };
  });
  affection = Math.min(100, affection);

  const outcome = { beats, affection, accepted: affection >= YES_SCORE };
  outcomeStore.set(outcome);
  recordFinale(affection);
  return outcome;
}

// React hook: where the player stands with her. Before the proposal, affection assumes
// every chosen option goes smoothly. Afterward, outcome holds the locked-in result.
export function useProposalResult() {
  const scores = useScores();
  const outcome = outcomeStore.useValue();
  const { steps } = useProposalPlan();
  const points = steps.reduce((sum, step) => sum + (step.chosen?.points ?? 0), 0);

  return {
    affection: outcome?.affection ?? Math.min(100, averageGameScore(scores) + points),
    ready: allGamesPlayed(scores),
    accepted: outcome?.accepted ?? false,
    outcome,
  };
}

// Starts a new game: clears all scores, choices, and money, and refills hearts.
export function resetProgress() {
  resetScores();
  choicesStore.set({});
  outcomeStore.set(null);
  resetWallet();
}
