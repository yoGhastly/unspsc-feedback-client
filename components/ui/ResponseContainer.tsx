"use client";
import { BlockMessage } from "./BlockMessage";
import { useFormStore } from "@/app/modules/form/store/form.store";

interface Props {
  onFeedback: (formData: FormData) => Promise<void>;
}

export const ResponseContainer: React.FC<Props> = ({ onFeedback }) => {
  const { formMessage } = useFormStore();

  return <BlockMessage message={formMessage} onFeedback={onFeedback} />;
};
