"use client";

import { useState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteParticipantButtonProps {
  name: string;
  onDeleted: () => void;
}

export function DeleteParticipantButton({
  name,
  onDeleted,
}: DeleteParticipantButtonProps) {
  const [busy, setBusy] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${name}?\n\nThis permanently removes their login (if they have one) and ALL of their training history and scores. This cannot be undone.`
    );
    if (!confirmed) return;

    const code = window.prompt("Enter the manager code to confirm:");
    if (!code) return;

    setBusy(true);
    try {
      const res = await fetch("/api/participants", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        window.alert(data.error || "Could not delete participant.");
        return;
      }
      onDeleted();
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
      onClick={handleDelete}
      disabled={busy}
      aria-label={`Delete ${name}`}
      title={`Delete ${name}`}
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash className="h-4 w-4 text-red-500" />
      )}
    </Button>
  );
}
