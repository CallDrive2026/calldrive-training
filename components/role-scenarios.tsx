"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Scenario } from "@/types";
import { LEVELS, LEVEL_ORDER } from "@/lib/scenarios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, ArrowRight, Lock, CheckCircle } from "lucide-react";

interface Props {
  role: string;
  scenarios: Scenario[];
}

export function RoleScenarios({ role, scenarios }: Props) {
  const [passedIds, setPassedIds] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetch("/api/rep/progress")
      .then((r) => (r.ok ? r.json() : { passedIds: [] }))
      .then((d) => setPassedIds(new Set<string>(d.passedIds ?? [])))
      .catch(() => undefined)
      .finally(() => setMounted(true));
  }, []);

  const byLevel = useMemo(() => {
    const map = new Map<string, Scenario[]>();
    for (const level of LEVEL_ORDER) {
      map.set(
        level,
        scenarios.filter((s) => s.level === level)
      );
    }
    return map;
  }, [scenarios]);

  const isLevelUnlocked = (levelIndex: number) => {
    if (levelIndex === 0) return true;
    const prevLevel = LEVEL_ORDER[levelIndex - 1];
    const prevScenarios = byLevel.get(prevLevel) || [];
    return prevScenarios.length > 0 && prevScenarios.every((s) => passedIds.has(s.id));
  };

  return (
    <div className="space-y-10">
      {LEVEL_ORDER.map((levelId, levelIndex) => {
        const levelInfo = LEVELS.find((l) => l.id === levelId)!;
        const levelScenarios = byLevel.get(levelId) || [];
        const unlocked = !mounted || isLevelUnlocked(levelIndex);

        return (
          <div key={levelId}>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-lg font-bold text-[#B4443A]">{levelInfo.label}</h2>
              <Badge variant="secondary" className="uppercase text-[10px] tracking-wide">
                Level {levelIndex + 1}
              </Badge>
              {!unlocked && (
                <Badge variant="outline" className="flex items-center gap-1 text-neutral-500">
                  <Lock className="h-3 w-3" /> Locked
                </Badge>
              )}
            </div>
            <p className="text-sm text-neutral-500 mb-4">{levelInfo.description}</p>

            <div className="space-y-3">
              {levelScenarios.map((s) => {
                const passed = passedIds.has(s.id);
                const content = (
                  <Card
                    className={
                      unlocked
                        ? "hover:shadow-md hover:border-[#B4443A]/40 transition-all cursor-pointer"
                        : "opacity-60 cursor-not-allowed"
                    }
                  >
                    <CardContent className="flex items-center justify-between py-5">
                      <div className="flex items-start gap-4">
                        <div className="h-9 w-9 rounded-full bg-[#B4443A]/10 flex items-center justify-center shrink-0 mt-0.5">
                          {unlocked ? (
                            <Phone className="h-4 w-4 text-[#B4443A]" />
                          ) : (
                            <Lock className="h-4 w-4 text-neutral-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {s.title}
                            {passed && <CheckCircle className="h-4 w-4 text-green-600" />}
                          </div>
                          <p className="text-sm text-neutral-500 mt-1">{s.situation}</p>
                          <Badge variant="secondary" className="mt-2">
                            Passing score: {s.passingScore}%
                          </Badge>
                        </div>
                      </div>
                      {unlocked && <ArrowRight className="h-5 w-5 text-neutral-400 shrink-0" />}
                    </CardContent>
                  </Card>
                );

                return unlocked ? (
                  <Link key={s.id} href={`/train/${role}/${s.id}`}>
                    {content}
                  </Link>
                ) : (
                  <div key={s.id}>{content}</div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
