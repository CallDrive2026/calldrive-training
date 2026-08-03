"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ShieldCheck, Loader2 } from "lucide-react";
import { setManager } from "@/lib/auth";

export default function ManagerLoginPage() {
  const router = useRouter();
  const [codeSet, setCodeSet] = useState<boolean | null>(null);
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/manager")
      .then((r) => r.json())
      .then((data) => setCodeSet(data.codeSet));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!codeSet && code !== confirmCode) {
      setError("Codes don't match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, mode: codeSet ? "verify" : "set" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      setManager(true);
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#152645]" />
            {codeSet === false ? "Set Up Manager Access" : "Manager Sign In"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {codeSet === null ? (
            <p className="text-sm text-neutral-500">Loading...</p>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {codeSet === false && (
                <p className="text-xs text-neutral-500">
                  No manager code exists yet. Create one now — this is the
                  code any manager will use to access the dashboard.
                </p>
              )}
              <div className="space-y-2">
                <Label htmlFor="code">{codeSet ? "Manager Code" : "Create a Manager Code"}</Label>
                <Input
                  id="code"
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="At least 4 characters"
                  required
                />
              </div>
              {codeSet === false && (
                <div className="space-y-2">
                  <Label htmlFor="confirmCode">Confirm Code</Label>
                  <Input
                    id="confirmCode"
                    type="password"
                    value={confirmCode}
                    onChange={(e) => setConfirmCode(e.target.value)}
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full bg-[#152645] hover:bg-[#152645]/90" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {codeSet ? "Sign In" : "Create Code & Sign In"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
