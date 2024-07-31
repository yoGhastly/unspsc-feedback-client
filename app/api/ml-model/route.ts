import { ModelResponse } from "@/app/types/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: { user_description: string } = await req.json();
  try {
    if (data.user_description === undefined) {
      return NextResponse.json(
        { message: "POST /api/ml-model" },
        { status: 400 },
      );
    }

    const { user_description } = data;

    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_description }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "POST /api/ml-model Response from ML model failed" },
        { status: 500 },
      );
    }

    const { unspsc_code, unspsc_description }: ModelResponse = await res.json();
    return NextResponse.json(
      { unspsc_code, unspsc_description },
      { status: 200 },
    );
  } catch (error) { }
  return NextResponse.json({ message: "POST /api/ml-model" }, { status: 200 });
}
