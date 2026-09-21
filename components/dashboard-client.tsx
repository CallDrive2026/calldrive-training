"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Attempt, PilotLead } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Users,
  CheckCircle,
  TrendingUp,
  RefreshCw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmployeeManager } from "@/components/employee-manager";
import { isManager } from "@/lib/auth";

export function DashboardClient() {
  const [manager, setManagerState] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [leads, setLeads] = useState<PilotLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    setManagerState(isManager());
  }, []);

  const fetchAttempts = useCallback(async () => {
    setLoading(true);
    try {
      const [attemptsRes, leadsRes] = await Promise.all([
        fetch("/api/attempts"),
        fetch("/api/pilot-leads"),
      ]);
      const attemptsData = await attemptsRes.json();
      setAttempts(attemptsData);
      if (leadsRes.ok) {
        setLeads(await leadsRes.json());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (manager) fetchAttempts();
  }, [manager, fetchAttempts]);

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const stats = useMemo(() => {
    const total = attempts.length;
    const passed = attempts.filter((a) => a.passed).length;
    const avgScore = total
      ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / total)
      : 0;
    const uniqueEmployees = new Set(attempts.map((a) => a.employeeName)).size;
    return { total, passed, avgScore, uniqueEmployees };
  }, [attempts]);

  const byEmployee = useMemo(() => {
    const map = new Map<string, { location: string; scores: number[]; passed: number }>();
    for (const a of attempts) {
      const key = a.employeeName;
      if (!map.has(key)) map.set(key, { location: a.location, scores: [], passed: 0 });
      const entry = map.get(key)!;
      entry.scores.push(a.score);
      if (a.passed) entry.passed += 1;
    }
    return Array.from(map.entries())
      .map(([name, v]) => ({
        name,
        location: v.location,
        attempts: v.scores.length,
        passed: v.passed,
        avgScore: Math.round(v.scores.reduce((s, n) => s + n, 0) / v.scores.length),
      }))
      .sort((a, b) => b.avgScore - a.avgScore);
  }, [attempts]);

  if (manager === null) {
    return <Skeleton className="h-32" />;
  }

  if (!manager) {
    return (
      <Card>
        <CardContent className="py-12 text-center space-y-4">
          <ShieldCheck className="h-10 w-10 text-[#B4443A] mx-auto" />
          <p className="text-neutral-600">Manager sign-in is required to view this dashboard.</p>
          <Link href="/manager-login">
            <Button className="bg-[#B4443A] hover:bg-[#B4443A]/90">Manager Sign In</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-neutral-500">Total attempts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.uniqueEmployees}</div>
            <p className="text-xs text-neutral-500">Employees trained</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.avgScore}%</div>
            <p className="text-xs text-neutral-500">Average score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.passed}</div>
            <p className="text-xs text-neutral-500">Passed attempts</p>
          </CardContent>
        </Card>
      </div>

      <EmployeeManager />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4 text-[#B4443A]" /> By Employee
          </CardTitle>
          <Button variant="outline" size="sm" onClick={fetchAttempts}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {byEmployee.length === 0 ? (
            <p className="text-sm text-neutral-500 py-8 text-center">
              No attempts yet. Results will appear here once employees complete scenarios.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Passed</TableHead>
                  <TableHead>Avg. Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {byEmployee.map((e) => (
                  <TableRow key={e.name}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.location}</TableCell>
                    <TableCell>{e.attempts}</TableCell>
                    <TableCell>{e.passed}</TableCell>
                    <TableCell>
                      <Badge
                        variant={e.avgScore >= 80 ? "default" : "secondary"}
                        className="flex w-fit items-center gap-1"
                      >
                        {e.avgScore >= 80 && <TrendingUp className="h-3 w-3" />}
                        {e.avgScore}%
                      </Badge>
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
            <CheckCircle className="h-4 w-4 text-[#B4443A]" /> Recent Attempts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {attempts.length === 0 ? (
            <p className="text-sm text-neutral-500 py-8 text-center">No attempts yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Scenario</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempts.slice(0, 25).map((a) => {
                  const isOpen = expanded.has(a.id);
                  const hasDetail = a.mode === "call";
                  return (
                    <>
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.employeeName}</TableCell>
                        <TableCell>{a.scenarioTitle}</TableCell>
                        <TableCell className="capitalize">{a.role}</TableCell>
                        <TableCell>{a.score}%</TableCell>
                        <TableCell>
                          <Badge variant={a.passed ? "default" : "destructive"}>
                            {a.passed ? "Passed" : "Failed"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {hasDetail && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpanded(a.id)}
                            >
                              {isOpen ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                      {hasDetail && isOpen && (
                        <TableRow key={`${a.id}-detail`}>
                          <TableCell colSpan={6} className="bg-neutral-50">
                            <div className="space-y-3 py-2 text-sm">
                              {a.categoryScores && a.categoryScores.length > 0 && (
                                <div>
                                  <p className="font-medium mb-1">Score breakdown</p>
                                  <ul className="space-y-1 text-neutral-600">
                                    {a.categoryScores.map((c, i) => (
                                      <li key={i}>
                                        {c.name}: {c.score}/100 — {c.note}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {a.coachingNotes && (
                                <div>
                                  <p className="font-medium mb-1">Coaching notes</p>
                                  <p className="text-neutral-600">{a.coachingNotes}</p>
                                </div>
                              )}
                              {a.wordTrack && (
                                <div>
                                  <p className="font-medium mb-1">Suggested word track</p>
                                  <p className="text-neutral-600 italic">
                                    &ldquo;{a.wordTrack}&rdquo;
                                  </p>
                                </div>
                              )}
                              {a.transcript && (
                                <div>
                                  <p className="font-medium mb-1">Employee said</p>
                                  <p className="text-neutral-500">{a.transcript}</p>
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4 text-[#B4443A]" /> Pilot Program Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <p className="text-sm text-neutral-500 py-8 text-center">
              No pilot applications yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Work Email</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">{l.name}</TableCell>
                    <TableCell>{l.workEmail}</TableCell>
                    <TableCell className="max-w-xs truncate">{l.goal}</TableCell>
                    <TableCell>{new Date(l.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
