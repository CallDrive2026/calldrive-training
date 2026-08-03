"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Scenario } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Certificate } from "@/components/certificate";
import { markPassed } from "@/lib/progress";
import { getEmployee, LoggedInEmployee } from "@/lib/auth";
import { CheckCircle, XCircle, Phone, Loader2, User } from "lucide-react";

interface Props {
  scenario: Scenario;
  roleLabel: string;
}

type Step = "intro" | "quiz" | "result";

export function ScenarioPractice({ scenario, roleLabel }: Props) {
  const router = useRouter();
  const [employee, setEmployeeState] = useState<LoggedInEmployee | null | undefined>(undefined);
  const [step, setStep] = useState<Step>("intro");
  const [checklist, setChecklist] = useState<boolean[]>(
    new Array(scenario.checklist.length).fill(false)
  );
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(scenario.questions.length).fill(null)
  );
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const emp = getEmployee();
    if (!emp) {
      setEmployeeState(null);
      router.replace(`/login?next=/train/${scenario.role}/${scenario.id}`);
      return;
    }
    setEmployeeState(emp);
  }, [router, scenario.role, scenario.id]);

  const toggleChecklist = (i: number) => {
    const next = [...checklist];
    next[i] = !next[i];
    setChecklist(next);
  };

  const setAnswer = (qIndex: number, optIndex: number) => {
    const next = [...answers];
    next[qIndex] = optIndex;
    setAnswers(next);
  };

  const canSubmitQuiz = answers.every((a) => a !== null);

  const submitQuiz = useCallback(async () => {
    setSubmitting(true);
    const correct = scenario.questions.filter(
      (q, i) => answers[i] === q.correctIndex
    ).length;
    const pct = Math.round((correct / scenario.questions.length) * 100);
    const passed = pct >= scenario.passingScore;
    setScore(pct);

    if (passed) {
      markPassed(scenario.id);
    }

    try {
      await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeName: employee?.name || "Anonymous",
          location: employee?.location || "Unspecified",
          role: scenario.role,
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          score: pct,
          passed,
        }),
      });
    } catch {
      // non-blocking — local result still shows
    }

    setSubmitting(false);
    setStep("result");
  }, [answers, employee, scenario]);

  if (employee === undefined) {
    return <p className="text-sm text-neutral-500 py-12 text-center">Loading...</p>;
  }
  if (employee === null) {
    return null; // redirecting to /login
  }

  if (step === "intro") {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-[#152645] font-medium">{roleLabel} Scenario</p>
          <h1 className="text-2xl font-bold mt-1">{scenario.title}</h1>
          <p className="text-neutral-500 mt-2">{scenario.situation}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Phone className="h-4 w-4 text-[#152645]" /> Listen to the call
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio controls src={scenario.audioUrl} className="w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Self-check while you listen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {scenario.checklist.map((item, i) => (
              <label key={i} className="flex items-start gap-3 text-sm cursor-pointer">
                <Checkbox checked={checklist[i]} onCheckedChange={() => toggleChecklist(i)} />
                <span>{item}</span>
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 py-4 text-sm text-neutral-600">
            <User className="h-4 w-4 text-[#152645]" />
            Logging this attempt as <strong>{employee.name}</strong>
            {employee.location ? ` — ${employee.location}` : ""}
          </CardContent>
        </Card>

        <Button onClick={() => setStep("quiz")} className="w-full bg-[#152645] hover:bg-[#152645]/90" size="lg">
          Continue to the test
        </Button>
      </div>
    );
  }

  if (step === "quiz") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{scenario.title} — Test</h1>
        {scenario.questions.map((q, qi) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {qi + 1}. {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {q.options.map((opt, oi) => (
                <label
                  key={oi}
                  className="flex items-center gap-3 text-sm rounded-md border p-3 cursor-pointer hover:bg-neutral-50 data-[checked=true]:border-[#152645] data-[checked=true]:bg-[#152645]/5"
                  data-checked={answers[qi] === oi}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[qi] === oi}
                    onChange={() => setAnswer(qi, oi)}
                    className="accent-[#152645]"
                  />
                  {opt}
                </label>
              ))}
            </CardContent>
          </Card>
        ))}
        <Button
          onClick={submitQuiz}
          disabled={!canSubmitQuiz || submitting}
          className="w-full bg-[#152645] hover:bg-[#152645]/90"
          size="lg"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Submit Test
        </Button>
      </div>
    );
  }

  const passed = (score ?? 0) >= scenario.passingScore;

  return (
    <div className="space-y-6">
      <Alert className={passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}>
        {passed ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <XCircle className="h-4 w-4 text-red-600" />
        )}
        <AlertTitle>
          {passed ? "Passed!" : "Not quite — review and try again"}
        </AlertTitle>
        <AlertDescription>
          You scored <Badge variant="secondary">{score}%</Badge> — passing score is{" "}
          {scenario.passingScore}%.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scenario.questions.map((q, qi) => {
            const correct = answers[qi] === q.correctIndex;
            return (
              <div key={q.id} className="text-sm">
                <div className="flex items-start gap-2 font-medium">
                  {correct ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                  )}
                  {q.question}
                </div>
                <p className="text-neutral-500 ml-6 mt-1">{q.explanation}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {passed && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <Certificate
              employeeName={employee.name}
              scenarioTitle={scenario.title}
              date={new Date().toLocaleDateString()}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
          Retry Scenario
        </Button>
        <Button
          onClick={() => (window.location.href = `/train/${scenario.role}`)}
          className="flex-1 bg-[#152645] hover:bg-[#152645]/90"
        >
          Back to Scenarios
        </Button>
      </div>
    </div>
  );
}
