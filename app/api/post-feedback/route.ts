import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { feedback }: { feedback: any[] } = await request.json();

  if (!feedback || feedback.length === 0) {
    return NextResponse.json(
      { message: "No feedback data found" },
      { status: 400 },
    );
  }

  console.log("Feedback data:", feedback);

  try {
    const response = await fetch("http://localhost:5000/save-feedback", {
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
