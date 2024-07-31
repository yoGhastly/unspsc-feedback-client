"use server";

import { FeedbackResponse, ModelResponse } from "@/app/types/api";

export async function submit(formData: FormData) {
  try {
    const rawData = {
      user_description: formData.get("users-description") as string,
    };
    const res = await fetch(`http://localhost:3000/api/ml-model`, {
      method: "POST",
      body: JSON.stringify(rawData),
    });
    if (!res.ok) {
      console.error("Failed to submit user's description to ML model");
      return { unspsc_code: "", unspsc_description: "" };
    }

    const { unspsc_code, unspsc_description }: ModelResponse = await res.json();

    return { unspsc_code, unspsc_description };
  } catch (error) {
    console.error("Failed to submit form data", error);
  }
}

export async function sendFeedback(formData: FormData) {
  try {
    console.log(formData.values());
    const rawData: FeedbackResponse = {
      feedback: {
        unspsc_code: formData.get("unspsc_code") as string,
        unspsc_description: formData.get("unspsc_description") as string,
        new_unspsc_code: formData.get("new_unspsc_code") as string,
        new_unspsc_description: formData.get(
          "new_unspsc_description",
        ) as string,
      },
    };
    const res = await fetch(`http://localhost:3000/api/post-feedback`, {
      method: "POST",
      body: JSON.stringify(rawData),
    });
    if (!res.ok) {
      console.error("Failed to submit feedback to ML model", res.statusText);
    }
  } catch (error) {
    console.error("Failed to submit feedback", error);
  }
}
