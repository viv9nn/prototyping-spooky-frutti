"use client";

import { useSyncExternalStore } from "react";

export type StageGrade = "S" | "A" | "B" | "C";

export interface StageResult {
  grade: StageGrade;
  suspicion: number;
  timesCaught: number;
  timesSpotted: number;
  clearedAt: number;
}

export interface GameState {
  affection: number;
  suspicion: number;
  stageResults: Record<string, StageResult>;
  flags: Record<string, boolean | string | number>;
}

const STORAGE_KEY = "spooky-frutti-game-state";
const listeners = new Set<() => void>();

const defaultState: GameState = {
  affection: 50,
  suspicion: 0,
  stageResults: {},
  flags: {},
};

let cachedState: GameState | null = null;

function loadState(): GameState {
  if (cachedState !== null) return cachedState;
  if (typeof window === "undefined") return defaultState;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      cachedState = {
        affection: typeof parsed.affection === "number" ? parsed.affection : 50,
        suspicion: typeof parsed.suspicion === "number" ? parsed.suspicion : 0,
        stageResults: parsed.stageResults || {},
        flags: parsed.flags || {},
      };
      return cachedState;
    }
  } catch {
    // fallback to default
  }

  cachedState = { ...defaultState };
  return cachedState;
}

function saveState(nextState: GameState) {
  cachedState = nextState;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch {
      // storage unavailable
    }
  }
  listeners.forEach((l) => l());
}

export function getGameState(): GameState {
  return loadState();
}

export function setSuspicion(suspicion: number) {
  const current = loadState();
  saveState({
    ...current,
    suspicion: Math.max(0, Math.min(100, suspicion)),
  });
}

export function setAffection(affection: number) {
  const current = loadState();
  saveState({
    ...current,
    affection: Math.max(0, Math.min(100, affection)),
  });
}

export function recordStageResult(stageId: string, result: StageResult) {
  const current = loadState();
  saveState({
    ...current,
    suspicion: result.suspicion,
    stageResults: {
      ...current.stageResults,
      [stageId]: result,
    },
  });
}

export function setFlag(key: string, value: boolean | string | number) {
  const current = loadState();
  saveState({
    ...current,
    flags: {
      ...current.flags,
      [key]: value,
    },
  });
}

function subscribe(listener: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY || event.key === null) {
      cachedState = null;
      listener();
    }
  }
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useGameState(): GameState {
  return useSyncExternalStore(subscribe, getGameState, () => defaultState);
}
