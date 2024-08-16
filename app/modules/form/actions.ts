"use server";

export async function submit(formData: FormData) {
  try {
    if (!formData.has("file")) {
      console.error("No file found in form data");
      return false;
    }
    const res = await fetch(`http://localhost:3000/api/ml-model`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Failed to submit file to ML model", res.statusText);
    }
    const data = await res.json();
    console.log(data);

    return {
      submitted: data.submitted,
      url: data.url,
    };
  } catch (error) {
    console.error("Failed to submit file", error);
  }
}

export async function sendFeedback(formData: FormData) {
  console.log("Sending feedback...");
}
