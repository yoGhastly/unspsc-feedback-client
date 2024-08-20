import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      console.error("No file found or the file is not a valid File object");
      return NextResponse.json(
        { submitted: false, error: "No valid file found" },
        { status: 400 },
      );
    }

    const uploadData = new FormData();
    uploadData.append("file", file);

    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: uploadData,
    });

    const predictions = await res.json();

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to submit file to ML model", res.status, errorText);
      return NextResponse.json(
        { submitted: false, error: errorText },
        { status: res.status },
      );
    }

    return NextResponse.json({ submitted: true, predictions });
  } catch (error) {
    console.error("Error while submitting file to Flask server:", error);
    return NextResponse.json(
      // @ts-ignore
      { submitted: false, error: error.message },
      { status: 500 },
    );
  }
}
