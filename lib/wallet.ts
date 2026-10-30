"use client";

import { chapters } from "@/lib/chapters";
import { createStore } from "@/lib/store";

// Retries the player gets on top of the 1 heart each game costs.
const EXTRA_HEARTS = 3;
const STARTING_HEARTS = chapters.filter((chapter) => !chapter.isFinale).length + EXTRA_HEARTS;

function createCurrency(key: string, starting: number) {
  const store = createStore<number>(key, starting, (raw) => {
    const saved = Number(raw);
    return Number.isSafeInteger(saved) && saved >= 0 ? saved : null;
  });

  return {
    get: store.get,
    useCount: store.useValue,
    reset: () => store.set(starting),

    // Returns false, and changes nothing, unless amount is a positive whole number.
    add(amount: number) {
      if (!isValidAmount(amount)) return false;
      store.set(store.get() + amount);
      return true;
    },

    // Returns false, and changes nothing, if the amount is invalid or the player
    // doesn't have enough.
    spend(amount: number) {
      if (!isValidAmount(amount) || amount > store.get()) return false;
      store.set(store.get() - amount);
      return true;
    },
  };
}

function isValidAmount(amount: number) {
  return Number.isSafeInteger(amount) && amount > 0;
}

const hearts = createCurrency("arcade-heart-lives", STARTING_HEARTS);
const money = createCurrency("arcade-money", 0);

export const getHearts = hearts.get;
export const addHearts = hearts.add;
export const spendHearts = hearts.spend;
export const useHearts = hearts.useCount;

export const getMoney = money.get;
export const addMoney = money.add;
export const spendMoney = money.spend;
export const useMoney = money.useCount;

export function resetWallet() {
  hearts.reset();
  money.reset();
}
