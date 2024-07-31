export interface ModelResponse {
  unspsc_code: string;
  unspsc_description: string;
}

export interface FeedbackResponse {
  feedback: Feedback;
}

export interface Feedback {
  unspsc_code: string | undefined;
  unspsc_description: string | undefined;
  new_unspsc_code: string;
  new_unspsc_description: string;
}
