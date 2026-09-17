"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";

export function PilotForm() {
  const [name, setName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/pilot-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, workEmail, goal }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center text-center gap-3 py-8">
        <CheckCircle className="h-10 w-10 text-[#152645]" />
        <p className="font-semibold text-lg">Thanks — we'll be in touch.</p>
        <p className="text-neutral-500 text-sm max-w-sm">
          We'll reach out to talk through your call moments, role mix, and manager workflow.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">Work email</label>
        <Input
          type="email"
          value={workEmail}
          onChange={(e) => setWorkEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">
          What would you want the pilot to improve?
        </label>
        <Textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={3} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#152645] hover:bg-[#152645]/90"
        size="lg"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Request pilot conversation
      </Button>
    </form>
  );
}
