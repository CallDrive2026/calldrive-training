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
import { CallRecorder } from "@/components/call-recorder";
import { markPassed } from "@/lib/progress";
import { getEmployee, LoggedInEmployee } from "@/lib/auth";
import { CheckCircle, XCircle, Phone, User, Copy, Check } from "lucide-react";

interface Props {
  scenario: Scenario;
  roleLabel: string;
}

type Step = "intro" | "record" | "result" | "error";

interface CategoryScore {
  name: string;
  score: number;
  note: string;
}

interface ScoreResult {
  score: number;
  passed: boolean;
  passingScore: number;
  transcript: string | null;
  categoryScores: CategoryScore[] | null;
  coachingNotes: string | null;
  wordTrack: string | null;
}

export function ScenarioPractice({ scenario, roleLabel }: Props) {
  const router = useRouter();
  const [employee, setEmployeeState] = useState<LoggedInEmployee | null | undefined>(undefined);
  const [step, setStep] = useState<Step>("intro");
  const [checklist, setChecklist] = useState<boolean[]>(
    new Array(scenario.checklist.length).fill(false)
  );
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const emp = getEmployee();
    if (!emp) {
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

  const submitRecording = useCallback(
    async (audioBase64: string, mimeType: string) => {
      setSubmitting(true);
      setErrorMsg(null);
      try {
        const res = await fetch("/api/attempts/score-call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            scenarioId: scenario.id,
            audioBase64,
            mimeType,
            employeeName: employee?.name || "Anonymous",
            location: employee?.location || "Unspecified",
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || "Something went wrong scoring your call.");
          setStep("error");
          return;
        }
        if (data.passed) {
          markPassed(scenario.id);
        }
        setResult({
          score: data.score,
          passed: data.passed,
          passingScore: data.passingScore,
          transcript: data.transcript,
          categoryScores: data.categoryScores,
          coachingNotes: data.coachingNotes,
          wordTrack: data.wordTrack,
        });
        setStep("result");
      } catch {
        setErrorMsg("Network error while scoring your call. Please try again.");
        setStep("error");
      } finally {
        setSubmitting(false);
      }
    },
    [scenario, employee]
  );

  const copyWordTrack = () => {
    if (!result?.wordTrack) return;
    navigator.clipboard.writeText(result.wordTrack);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        <Button
          onClick={() => setStep("record")}
          className="w-full bg-[#152645] hover:bg-[#152645]/90"
          size="lg"
        >
          Practice your response
        </Button>
      </div>
    );
  }

  if (step === "record") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{scenario.title} — Your Turn</h1>
          <p className="text-neutral-500 mt-2">
            Play the call again if you need to, then record exactly how you'd respond to
            this customer. Your response will be scored automatically.
          </p>
        </div>

        <Card>
          <CardContent className="py-4">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio controls src={scenario.audioUrl} className="w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Record your response</CardTitle>
          </CardHeader>
          <CardContent>
            <CallRecorder onSubmit={submitRecording} submitting={submitting} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="space-y-6">
        <Alert className="border-red-300 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertTitle>Couldn't score this attempt</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
        <Button onClick={() => setStep("record")} className="w-full bg-[#152645] hover:bg-[#152645]/90">
          Try again
        </Button>
      </div>
    );
  }

  // step === "result"
  if (!result) return null;
  const { score, passed, passingScore, transcript, categoryScores, coachingNotes, wordTrack } =
    result;

  return (
    <div className="space-y-6">
      <Alert className={passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}>
        {passed ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <XCircle className="h-4 w-4 text-red-600" />
        )}
        <AlertTitle>{passed ? "Passed!" : "Not quite — review and try again"}</AlertTitle>
        <AlertDescription>
          You scored <Badge variant="secondary">{score}/100</Badge> — passing score is{" "}
          {passingScore}/100.
        </AlertDescription>
      </Alert>

      {categoryScores && categoryScores.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Score breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryScores.map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{c.name}</span>
                  <span>{c.score}/100</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-[#152645]"
                    style={{ width: `${Math.max(0, Math.min(100, c.score))}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-500">{c.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {coachingNotes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Coaching notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-700">{coachingNotes}</p>
          </CardContent>
        </Card>
      )}

      {wordTrack && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Word track for next time</CardTitle>
            <Button variant="outline" size="sm" onClick={copyWordTrack}>
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-700 italic">&ldquo;{wordTrack}&rdquo;</p>
          </CardContent>
        </Card>
      )}

      {transcript && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">What you said</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500">{transcript}</p>
          </CardContent>
        </Card>
      )}

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
