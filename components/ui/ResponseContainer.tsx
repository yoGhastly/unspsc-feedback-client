"use client";
import { useFilePreviewerStore } from "@/app/modules/file-previewer/store";
import { BlockMessage } from "./BlockMessage";
import { useFormStore } from "@/app/modules/form/store/form.store";

interface Props {
  onFeedback: (editedRows: any[]) => Promise<Response | undefined>;
}

export const ResponseContainer: React.FC<Props> = ({ onFeedback }) => {
  const { formMessage } = useFormStore();
  const { data } = useFilePreviewerStore();

  return (
    <BlockMessage message={formMessage} data={data} onFeedback={onFeedback} />
  );
};
