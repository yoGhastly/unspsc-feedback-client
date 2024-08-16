"use client";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Label } from "./Label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";
import { ModalInput } from "./ModalInput";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useFormStore } from "@/app/modules/form/store/form.store";
import { useFilePreviewerStore } from "@/app/modules/file-previewer/store";

interface Props {
  action: (
    formData: FormData,
  ) => Promise<false | { submitted: any; url: any } | undefined>;
}

export const Form: React.FC<Props> = ({ action }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const { setFormMessage } = useFormStore();
  const { setFileUrl } = useFilePreviewerStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await action(formData);

      if (result) {
        setSubmitStatus("File submitted successfully!");
        setFileUrl(result.url);
      } else {
        setSubmitStatus("Failed to submit file.");
      }
    } catch (error) {
      setSubmitStatus("An error occurred while submitting the file.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  };

  useEffect(() => {
    if (submitStatus) {
      setFormMessage(submitStatus);
    }
  }, [submitStatus]);

  return (
    <section className="max-w-xl w-full bg-[#18181B] rounded-md flex flex-col gap-12 p-3">
      <div className="flex gap-3 mx-4 items-start">
        <p className="text-white/70">
          Upload a file to get started. We support .csv, .xlsx, and xlsm
          extensions.
        </p>
      </div>
      <form
        className="mx-auto w-full max-w-lg flex flex-col gap-4"
        id="send_file_form"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2 items-center">
          <Label htmlFor="input_file" className="text-white">
            Input File
          </Label>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InformationCircleIcon className="text-white h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  The File must contain the column names of{" "}
                  <code className="text-yellow-500">Description</code> and{" "}
                  <code className="text-lime-500">Supplier Name</code>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ModalInput
          type="file"
          id="input_file"
          accept=".csv, .xlsx, .xlsm"
          onChange={handleFileChange}
        />
        <Button type="submit" disabled={!file || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </section>
  );
};
