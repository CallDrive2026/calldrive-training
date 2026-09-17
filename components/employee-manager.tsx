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
import { UserPlus, Trash, AlertCircle, Loader2 } from "lucide-react";

interface EmployeeOption {
  id: string;
  name: string;
  location: string;
  createdAt: string;
}

export function EmployeeManager() {
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEmployees = useCallback(async () => {
    const res = await fetch("/api/employees");
    setEmployees(await res.json());
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

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
        setLoading(false);
        return;
      }
      setName("");
      setPin("");
      setLocation("");
      await fetchEmployees();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const removeEmployee = async (id: string) => {
    await fetch(`/api/employees/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <UserPlus className="h-4 w-4 text-[#B91C1C]" /> Employee Accounts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={addEmployee} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div className="space-y-1">
            <Label htmlFor="emp-name">Name</Label>
            <Input id="emp-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="emp-pin">PIN (4+ digits)</Label>
            <Input
              id="emp-pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              minLength={4}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="emp-location">Location</Label>
            <Input id="emp-location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <Button type="submit" className="bg-[#B91C1C] hover:bg-[#B91C1C]/90" disabled={loading}>
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-16"></TableHead>
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
                    <Button variant="ghost" size="sm" onClick={() => removeEmployee(e.id)}>
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
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
