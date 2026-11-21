import { useEffect, useSyncExternalStore } from "react";

const KEY = "meridian-atlas-reflex-studied";

let ids: string[] = [];
let ready = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* private mode */
  }
  emit();
}

export function hydrateReflexStudied() {
  if (ready || typeof localStorage === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      ids = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
    }
  } catch {
    ids = [];
  }
  ready = true;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function snapshot() {
  return ready ? ids : EMPTY;
}

const EMPTY: string[] = [];

export function useReflexStudied() {
  const state = useSyncExternalStore(subscribe, snapshot, () => EMPTY);
  useEffect(() => {
    hydrateReflexStudied();
  }, []);
  return state;
}

export function toggleReflexStudied(id: string) {
  hydrateReflexStudied();
  ids = ids.includes(id) ? ids.filter((item) => item !== id) : [id, ...ids];
  persist();
}
