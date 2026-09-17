"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2, RotateCcw } from "lucide-react";

interface Props {
  onSubmit: (audioBase64: string, mimeType: string) => void;
  submitting: boolean;
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // strip the "data:<mime>;base64," prefix
      const base64 = result.split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function CallRecorder({ onSubmit, submitting }: Props) {
  const [recording, setRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);

  const startRecording = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";
      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        blobRef.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        setHasRecording(true);
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
    } catch {
      setError(
        "Couldn't access your microphone. Please allow microphone access and try again."
      );
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }, []);

  const reRecord = useCallback(() => {
    setHasRecording(false);
    setAudioUrl(null);
    blobRef.current = null;
  }, []);

  const submit = useCallback(async () => {
    if (!blobRef.current) return;
    const base64 = await blobToBase64(blobRef.current);
    onSubmit(base64, blobRef.current.type || "audio/webm");
  }, [onSubmit]);

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!hasRecording && (
        <div className="flex flex-col items-center gap-3 py-6">
          <Button
            type="button"
            size="lg"
            onClick={recording ? stopRecording : startRecording}
            className={
              recording
                ? "bg-red-600 hover:bg-red-700 rounded-full h-16 w-16 p-0"
                : "bg-[#152645] hover:bg-[#152645]/90 rounded-full h-16 w-16 p-0"
            }
          >
            {recording ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>
          <p className="text-sm text-neutral-500">
            {recording ? "Recording — tap to stop" : "Tap to record your response"}
          </p>
        </div>
      )}

      {hasRecording && audioUrl && (
        <div className="space-y-3">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio controls src={audioUrl} className="w-full" />
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={reRecord}
              disabled={submitting}
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Re-record
            </Button>
            <Button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="flex-1 bg-[#152645] hover:bg-[#152645]/90"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Scoring your call...
                </>
              ) : (
                "Submit for scoring"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
