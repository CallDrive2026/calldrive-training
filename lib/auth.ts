"use client";

// Browser-side flag that the dashboard's manager code was entered in this
// browser. It only controls what the page shows; the server separately
// requires a signed-in organization admin and checks the code itself.

const MGR_KEY = "calldrive_is_manager";

export function isManager(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MGR_KEY) === "true";
}

export function setManager(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) window.localStorage.setItem(MGR_KEY, "true");
  else window.localStorage.removeItem(MGR_KEY);
}
