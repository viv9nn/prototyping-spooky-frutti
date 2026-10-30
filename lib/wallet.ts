"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "arcade-hearts";
const listeners = new Set<() => void>();
let hearts: number | null = null; // loaded from localStorage on first use

function getHearts() {
  if (hearts === null) {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    hearts = Number.isSafeInteger(saved) && saved >= 0 ? saved : 0;
  }
  return hearts;
}

function setHearts(count: number) {
  hearts = count;
  localStorage.setItem(STORAGE_KEY, String(count));
  listeners.forEach((listener) => listener());
}

function isValidAmount(amount: number) {
  return Number.isSafeInteger(amount) && amount > 0;
}

// Returns false, and changes nothing, unless amount is a positive whole number.
export function addHearts(amount: number) {
  if (!isValidAmount(amount)) return false;
  setHearts(getHearts() + amount);
  return true;
}

// Returns false, and changes nothing, if the amount is invalid or the player
// doesn't have enough hearts.
export function spendHearts(amount: number) {
  if (!isValidAmount(amount) || amount > getHearts()) return false;
  setHearts(getHearts() - amount);
  return true;
}

function subscribe(listener: () => void) {
  // Keeps the count in sync when another browser tab changes it.
  function onStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY || event.key === null) {
      hearts = null;
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

// React hook: the current heart count, re-rendering whenever it changes.
export function useHearts() {
  return useSyncExternalStore(subscribe, getHearts, () => 0);
}
