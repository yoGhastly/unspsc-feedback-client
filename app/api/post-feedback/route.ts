import { FeedbackResponse } from "@/app/types/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { feedback }: FeedbackResponse = await request.json();
  try {
    const response = await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    });

    if (!response.ok) {
      throw new Error("Failed to post feedback");
    }

    return NextResponse.json(
      { message: "POST /api/post-feedback" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to post feedback" },
      { status: 500 },
    );
  }
}
