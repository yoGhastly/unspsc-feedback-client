import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // Check if 'file' is present and of type File
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
      body: uploadData, // Send the FormData directly
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to submit file to ML model", res.status, errorText);
      return NextResponse.json(
        { submitted: false, error: errorText },
        { status: res.status },
      );
    }

    // Handle file download
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    return NextResponse.json({ submitted: true, url });
  } catch (error) {
    console.error("Error while submitting file to Flask server:", error);
    return NextResponse.json(
      // @ts-ignore
      { submitted: false, error: error.message },
      { status: 500 },
    );
  }
}
