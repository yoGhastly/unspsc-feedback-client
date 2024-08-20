"use server";

export async function submit(formData: FormData) {
  try {
    if (!formData.has("file")) {
      console.error("No file found in form data");
      return {
        submitted: false,
        predictions: [],
      };
    }
    const res = await fetch(`http://localhost:3000/api/ml-model`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Failed to submit file to ML model", res.statusText);
    }
    const data: { submitted: boolean; predictions: any[] } = await res.json();

    return {
      submitted: data.submitted,
      predictions: data.predictions,
    };
  } catch (error) {
    console.error("Failed to submit file", error);
  }
}

export async function sendFeedback(editedRows: any[]) {
  if (editedRows.length === 0) {
    console.error("No feedback data found");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/post-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback: editedRows }),
    });
    if (!res.ok) {
      console.error("Failed to post feedback", res.statusText);
    }

    return res;
  } catch (error) {
    console.error("Failed to post feedback", error);
  }
}
