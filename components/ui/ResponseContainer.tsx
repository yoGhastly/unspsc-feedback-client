"use client";
import { useModelStore } from "@/app/modules/model/store/model.store";
import { BlockMessage } from "./BlockMessage";

interface Props {
  onFeedback: (formData: FormData) => Promise<void>;
}

export const ResponseContainer: React.FC<Props> = ({ onFeedback }) => {
  const { modelResponse } = useModelStore();

  return <BlockMessage message={modelResponse} onFeedback={onFeedback} />;
};
