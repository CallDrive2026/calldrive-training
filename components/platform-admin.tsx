"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Check, X, Loader2 } from "lucide-react";

interface PendingRequest {
  id: string;
  requestedLimit: number;
  note: string | null;
  createdAt: string;
}

interface OrgRow {
  id: string;
  name: string;
  subscriptionStatus: string;
  createdAt: string;
  employeeCount: number;
  employeeLimit: number;
  pendingRequest: PendingRequest | null;
}

function LimitEditor({ org, onSaved }: { org: OrgRow; onSaved: () => void }) {
  const [value, setValue] = useState(String(org.employeeLimit));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const save = async () => {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch(`/api/platform/orgs/${org.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeLimit: Number(value) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) setMsg(data.error || "Could not save.");
      else onSaved();
    } catch {
      setMsg("Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        min={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-24"
        aria-label={`Team limit for ${org.name}`}
      />
      <Button
        size="sm"
        variant="outline"
        onClick={save}
        disabled={busy || value === String(org.employeeLimit)}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
      </Button>
      {msg && <span className="text-xs text-red-600">{msg}</span>}
    </div>
  );
}

export function PlatformAdmin() {
  const [orgs, setOrgs] = useState<OrgRow[] | null>(null);
  const [error, setError] = useState("");
  const [deciding, setDeciding] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/platform/orgs");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not load accounts.");
      return;
    }
    setError("");
    setOrgs(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const decide = async (requestId: string, action: "approve" | "deny") => {
    setDeciding(requestId);
    try {
      await fetch(`/api/platform/seat-requests/${requestId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      await load();
    } finally {
      setDeciding(null);
    }
  };

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!orgs) return <Skeleton className="h-64" />;

  const pending = orgs.filter((o) => o.pendingRequest);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            Seat requests waiting for approval
            {pending.length > 0 && <Badge>{pending.length}</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pending.length === 0 ? (
            <p className="text-sm text-neutral-500 py-4 text-center">No requests right now.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dealership</TableHead>
                  <TableHead>Now</TableHead>
                  <TableHead>Requesting</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="w-48"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.name}</TableCell>
                    <TableCell>
                      {o.employeeCount} of {o.employeeLimit}
                    </TableCell>
                    <TableCell>{o.pendingRequest!.requestedLimit}</TableCell>
                    <TableCell className="max-w-xs truncate">{o.pendingRequest!.note}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          className="bg-[#B4443A] hover:bg-[#B4443A]/90"
                          disabled={deciding === o.pendingRequest!.id}
                          onClick={() => decide(o.pendingRequest!.id, "approve")}
                        >
                          <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={deciding === o.pendingRequest!.id}
                          onClick={() => decide(o.pendingRequest!.id, "deny")}
                        >
                          <X className="h-4 w-4 mr-1" /> Deny
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-4 w-4 text-[#B4443A]" /> All dealership accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dealership</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Team limit</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgs.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.name}</TableCell>
                  <TableCell className="capitalize">{o.subscriptionStatus}</TableCell>
                  <TableCell>
                    {o.employeeCount} of {o.employeeLimit}
                  </TableCell>
                  <TableCell>
                    <LimitEditor org={o} onSaved={load} />
                  </TableCell>
                  <TableCell>{new Date(o.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
