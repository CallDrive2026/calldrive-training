"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, AlertCircle, Loader2, Copy, Check, KeyRound, Link2 } from "lucide-react";
import { DeleteParticipantButton } from "@/components/delete-participant-button";

interface EmployeeOption {
  id: string;
  name: string;
  location: string;
  createdAt: string;
}

interface PendingRequest {
  id: string;
  requestedLimit: number;
  note: string | null;
}

interface TeamSummary {
  dealership: string;
  accessSlug: string;
  employeeCount: number;
  employeeLimit: number;
  pendingRequest: PendingRequest | null;
}

function ResetPinButton({ employee, onDone }: { employee: EmployeeOption; onDone: () => void }) {
  const [busy, setBusy] = useState(false);

  const reset = async () => {
    const pin = window.prompt(`New PIN for ${employee.name} (4 to 12 digits):`);
    if (!pin) return;
    const code = window.prompt("Enter the manager code to confirm:");
    if (!code) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/employees/${employee.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        window.alert(data.error || "Could not reset the PIN.");
        return;
      }
      window.alert(`${employee.name}'s PIN has been reset.`);
      onDone();
    } catch {
      window.alert("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={reset}
      disabled={busy}
      aria-label={`Reset PIN for ${employee.name}`}
      title={`Reset PIN for ${employee.name}`}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4 text-neutral-500" />}
    </Button>
  );
}

export function EmployeeManager({ onChange }: { onChange?: () => void }) {
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [summary, setSummary] = useState<TeamSummary | null>(null);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [requestedLimit, setRequestedLimit] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const [requestMsg, setRequestMsg] = useState("");
  const [requesting, setRequesting] = useState(false);

  const refresh = useCallback(async () => {
    const [empRes, sumRes] = await Promise.all([
      fetch("/api/employees"),
      fetch("/api/org/summary"),
    ]);
    if (empRes.ok) setEmployees(await empRes.json());
    if (sumRes.ok) setSummary(await sumRes.json());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const atLimit = summary ? summary.employeeCount >= summary.employeeLimit : false;
  const signInLink =
    summary && typeof window !== "undefined"
      ? `${window.location.origin}/login?d=${summary.accessSlug}`
      : "";

  const copyLink = async () => {
    if (!signInLink) return;
    await navigator.clipboard.writeText(signInLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pin, location }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not add employee.");
        if (data.code === "seat_limit") setShowRequest(true);
        setLoading(false);
        await refresh();
        return;
      }
      setName("");
      setPin("");
      setLocation("");
      await refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestMsg("");
    setRequesting(true);
    try {
      const res = await fetch("/api/seat-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestedLimit: Number(requestedLimit), note: requestNote }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setRequestMsg(data.error || "Could not send your request.");
        return;
      }
      setShowRequest(false);
      setRequestedLimit("");
      setRequestNote("");
      await refresh();
    } catch {
      setRequestMsg("Something went wrong.");
    } finally {
      setRequesting(false);
    }
  };

  const afterChange = () => {
    refresh();
    onChange?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-base">
          <span className="flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-[#B4443A]" /> Employee Accounts
          </span>
          {summary && (
            <span className={atLimit ? "text-sm font-medium text-[#B4443A]" : "text-sm font-normal text-neutral-500"}>
              {summary.employeeCount} of {summary.employeeLimit} team members
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {summary && (
          <div className="rounded-md border bg-neutral-50 p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Link2 className="h-4 w-4 text-[#B4443A]" /> Employee sign-in link
            </div>
            <p className="text-xs text-neutral-500">
              Send this to your team. They sign in with their name and the PIN you set. Dealership
              code: <strong>{summary.accessSlug}</strong>
            </p>
            <div className="flex items-center gap-2">
              <Input readOnly value={signInLink} className="text-xs" onFocus={(e) => e.currentTarget.select()} />
              <Button type="button" variant="outline" size="sm" onClick={copyLink}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
        )}

        <form onSubmit={addEmployee} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div className="space-y-1">
            <Label htmlFor="emp-name">Name</Label>
            <Input id="emp-name" value={name} onChange={(e) => setName(e.target.value)} required disabled={atLimit} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="emp-pin">PIN (4 to 12 digits)</Label>
            <Input
              id="emp-pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              inputMode="numeric"
              pattern="\d{4,12}"
              title="4 to 12 digits"
              required
              disabled={atLimit}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="emp-location">Location</Label>
            <Input id="emp-location" value={location} onChange={(e) => setLocation(e.target.value)} disabled={atLimit} />
          </div>
          <Button type="submit" className="bg-[#B4443A] hover:bg-[#B4443A]/90" disabled={loading || atLimit}>
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Add Employee
          </Button>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {summary && atLimit && (
          <div className="rounded-md border border-[#B4443A]/30 bg-[#B4443A]/5 p-3 space-y-3 text-sm">
            <p>
              You&apos;ve reached your limit of <strong>{summary.employeeLimit}</strong> team members.
              Adding more needs the platform owner&apos;s approval.
            </p>
            {summary.pendingRequest ? (
              <p className="text-neutral-600">
                Your request for <strong>{summary.pendingRequest.requestedLimit}</strong> team members
                is waiting for approval.
              </p>
            ) : showRequest ? (
              <form onSubmit={sendRequest} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div className="space-y-1">
                  <Label htmlFor="req-limit">How many team members do you need?</Label>
                  <Input
                    id="req-limit"
                    type="number"
                    min={summary.employeeLimit + 1}
                    value={requestedLimit}
                    onChange={(e) => setRequestedLimit(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="req-note">Note (optional)</Label>
                  <Input id="req-note" value={requestNote} onChange={(e) => setRequestNote(e.target.value)} />
                </div>
                <Button type="submit" disabled={requesting} className="bg-[#B4443A] hover:bg-[#B4443A]/90">
                  {requesting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Send request
                </Button>
                {requestMsg && <p className="md:col-span-3 text-xs text-red-600">{requestMsg}</p>}
              </form>
            ) : (
              <Button type="button" variant="outline" size="sm" onClick={() => setShowRequest(true)}>
                Request more seats
              </Button>
            )}
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-28"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-sm text-neutral-500 py-6">
                  No employees added yet.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{e.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end">
                      <ResetPinButton employee={e} onDone={afterChange} />
                      <DeleteParticipantButton name={e.name} onDeleted={afterChange} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
