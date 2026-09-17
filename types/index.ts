export type Role = "sales" | "reception" | "service";
export type Level = "newbie" | "seasoned" | "superstar";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Scenario {
  id: string;
  role: Role;
  level: Level;
  title: string;
  situation: string;
  audioUrl: string;
  checklist: string[];
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface CategoryScore {
  name: string;
  score: number; // 0-100
  note: string;
}

export interface Attempt {
  id: string;
  employeeName: string;
  location: string;
  role: Role;
  scenarioId: string;
  scenarioTitle: string;
  score: number;
  passed: boolean;
  createdAt: string;
  mode: "quiz" | "call";
  transcript?: string | null;
  categoryScores?: CategoryScore[] | null;
  coachingNotes?: string | null;
  wordTrack?: string | null;
}

export interface RoleInfo {
  id: Role;
  label: string;
  description: string;
}

export interface LevelInfo {
  id: Level;
  label: string;
  description: string;
}

export interface PilotLead {
  id: string;
  name: string;
  workEmail: string;
  goal: string | null;
  createdAt: string;
}
