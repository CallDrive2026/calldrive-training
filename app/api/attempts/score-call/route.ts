import { NextResponse } from "next/server";
import { getScenario } from "@/lib/scenarios";
import { addAttempt } from "@/lib/store";

interface GeminiCategoryScore {
  name: string;
  score: number;
  note: string;
}

interface GeminiGradeResult {
  transcript: string;
  overallScore: number;
  categoryScores: GeminiCategoryScore[];
  coachingNotes: string;
  wordTrack: string;
}

const GEMINI_MODEL = "gemini-3.6-flash";

function buildGradingPrompt(args: {
  situation: string;
  checklist: string[];
  title: string;
  passingScore: number;
}) {
  return `You are an expert dealership call-coaching manager grading a trainee's spoken response during a phone-call roleplay.

SCENARIO: "${args.title}"
CUSTOMER SITUATION: ${args.situation}

WHAT A STRONG RESPONSE SHOULD COVER (coaching checklist):
${args.checklist.map((c, i) => `${i + 1}. ${c}`).join("\n")}

The attached audio is the TRAINEE's spoken response to this customer call. First, transcribe exactly what the trainee said. Then grade their response against the checklist above.

Respond with ONLY valid JSON (no markdown fences, no extra text) matching this exact shape:
{
  "transcript": "<verbatim transcript of the trainee's spoken response>",
  "overallScore": <integer 0-100>,
  "categoryScores": [
    { "name": "Opening & Tone", "score": <0-100>, "note": "<one sentence>" },
    { "name": "Handling the Situation", "score": <0-100>, "note": "<one sentence>" },
    { "name": "Next Step / Close", "score": <0-100>, "note": "<one sentence>" }
  ],
  "coachingNotes": "<2-4 sentences of specific, actionable coaching on what to improve>",
  "wordTrack": "<a ready-to-use sample script/word track the trainee could say next time for this exact situation, 2-4 sentences>"
}

Grading guidance: a passing response covers most of the checklist naturally, sounds professional, and sets a clear next step. The passing threshold for this scenario is ${args.passingScore}/100 overall. Be honest and specific — vague or generic responses should score lower.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      scenarioId,
      audioBase64,
      mimeType,
      employeeName,
      location,
    } = body as {
      scenarioId: string;
      audioBase64: string;
      mimeType: string;
      employeeName?: string;
      location?: string;
    };

    if (!scenarioId || !audioBase64) {
      return NextResponse.json(
        { error: "scenarioId and audioBase64 are required." },
        { status: 400 }
      );
    }

    const scenario = getScenario(scenarioId);
    if (!scenario) {
      return NextResponse.json({ error: "Unknown scenario." }, { status: 404 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Live scoring is not configured yet (missing GEMINI_API_KEY)." },
        { status: 503 }
      );
    }

    const prompt = buildGradingPrompt({
      situation: scenario.situation,
      checklist: scenario.checklist,
      title: scenario.title,
      passingScore: scenario.passingScore,
    });

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: mimeType || "audio/webm",
                    data: audioBase64,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return NextResponse.json(
        { error: `Scoring service error: ${errText.slice(0, 300)}` },
        { status: 502 }
      );
    }

    const geminiJson = await geminiRes.json();
    const rawText: string | undefined =
      geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { error: "Scoring service returned no result." },
        { status: 502 }
      );
    }

    let parsed: GeminiGradeResult;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { error: "Could not parse scoring result." },
        { status: 502 }
      );
    }

    const overallScore = Math.max(0, Math.min(100, Math.round(parsed.overallScore)));
    const passed = overallScore >= scenario.passingScore;

    const attempt = await addAttempt({
      employeeName: employeeName || "Anonymous",
      location: location || "Unspecified",
      role: scenario.role,
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      score: overallScore,
      passed,
      mode: "call",
      transcript: parsed.transcript,
      categoryScores: parsed.categoryScores,
      coachingNotes: parsed.coachingNotes,
      wordTrack: parsed.wordTrack,
    });

    return NextResponse.json(
      {
        ...attempt,
        passingScore: scenario.passingScore,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected scoring error." },
      { status: 500 }
    );
  }
}
