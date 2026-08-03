"use client";

const EMP_KEY = "calldrive_employee";
const MGR_KEY = "calldrive_is_manager";

export interface LoggedInEmployee {
  id: string;
  name: string;
  location: string;
}

export function getEmployee(): LoggedInEmployee | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(EMP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setEmployee(employee: LoggedInEmployee) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EMP_KEY, JSON.stringify(employee));
}

export function clearEmployee() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(EMP_KEY);
}

export function isManager(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MGR_KEY) === "true";
}

export function setManager(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) window.localStorage.setItem(MGR_KEY, "true");
  else window.localStorage.removeItem(MGR_KEY);
}
