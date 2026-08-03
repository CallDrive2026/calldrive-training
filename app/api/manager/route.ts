import { NextResponse } from "next/server";
import { isManagerCodeSet, setManagerCode, verifyManagerCode } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ codeSet: await isManagerCodeSet() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { code, mode } = body;

  if (!code || String(code).length < 4) {
    return NextResponse.json({ error: "Code must be at least 4 characters." }, { status: 400 });
  }

  if (mode === "set") {
    if (await isManagerCodeSet()) {
      return NextResponse.json({ error: "A manager code is already set." }, { status: 409 });
    }
    await setManagerCode(code);
    return NextResponse.json({ ok: true });
  }

  // mode === "verify"
  if (!(await isManagerCodeSet())) {
    return NextResponse.json({ error: "No manager code has been set yet." }, { status: 400 });
  }
  if (!(await verifyManagerCode(code))) {
    return NextResponse.json({ error: "Incorrect manager code." }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
