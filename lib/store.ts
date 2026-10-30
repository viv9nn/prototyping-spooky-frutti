"use client";

import { useSyncExternalStore } from "react";

// A parse function for stores that hold a plain object.
export function parseObject<T extends object>(raw: string) {
  try {
    const saved = JSON.parse(raw);
    return typeof saved === "object" && saved !== null && !Array.isArray(saved) ? (saved as T) : null;
  } catch {
    return null;
  }
}

// A value saved in localStorage that React components can subscribe to.
// parse returns null if the saved data is unusable, which resets it to fallback.
export function createStore<T>(key: string, fallback: T, parse: (raw: string) => T | null) {
  const listeners = new Set<() => void>();
  let value: T | null = null; // loaded from localStorage on first use

  function get() {
    if (value === null) {
      const raw = localStorage.getItem(key);
      value = (raw === null ? null : parse(raw)) ?? fallback;
    }
    return value;
  }

  function set(next: T) {
    value = next;
    localStorage.setItem(key, JSON.stringify(next));
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    // Keeps the value in sync when another browser tab changes it.
    function onStorage(event: StorageEvent) {
      if (event.key === key || event.key === null) {
        value = null;
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

  function useValue() {
    return useSyncExternalStore(subscribe, get, () => fallback);
  }

  return { get, set, useValue };
}
