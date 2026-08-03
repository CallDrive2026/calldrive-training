"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Attempt } from "@/types";
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
import { Users, CheckCircle, TrendingUp, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmployeeManager } from "@/components/employee-manager";
import { isManager } from "@/lib/auth";

export function DashboardClient() {
  const [manager, setManagerState] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setManagerState(isManager());
  }, []);

  const fetchAttempts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/attempts");
      const data = await res.json();
      setAttempts(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (manager) fetchAttempts();
  }, [manager, fetchAttempts]);

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
          <ShieldCheck className="h-10 w-10 text-[#152645] mx-auto" />
          <p className="text-neutral-600">Manager sign-in is required to view this dashboard.</p>
          <Link href="/manager-login">
            <Button className="bg-[#152645] hover:bg-[#152645]/90">Manager Sign In</Button>
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
            <Users className="h-4 w-4 text-[#152645]" /> By Employee
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
            <CheckCircle className="h-4 w-4 text-[#152645]" /> Recent Attempts
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempts.slice(0, 15).map((a) => (
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
