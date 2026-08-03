"use client";

const KEY = "calldrive_passed_scenarios";

export function getPassedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export function markPassed(scenarioId: string) {
  if (typeof window === "undefined") return;
  const set = getPassedIds();
  set.add(scenarioId);
  window.localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
}

export function isPassed(scenarioId: string): boolean {
  return getPassedIds().has(scenarioId);
}
