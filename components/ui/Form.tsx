"use client";
import {
  ArrowPathIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
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
  ) => Promise<{ submitted: boolean; predictions: any[] } | undefined>;
}

export const Form: React.FC<Props> = ({ action }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [regenerate, setRegenerate] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const { setFormMessage } = useFormStore();
  const { setData } = useFilePreviewerStore();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    isRegenerate = false,
  ) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await action(formData);

      if (result) {
        if (result.submitted) {
          setRegenerate(true);
        }
        setSubmitStatus(
          isRegenerate
            ? "Output file has been regenerated."
            : "Output file has been generated.",
        );
        const formattedData = result.predictions.map((prediction) => [
          { value: prediction["Original Input"] },
          { value: prediction["UNSPSC Code"] },
          { value: prediction["UNSPSC Description"] },
          { value: prediction["Category Code"] },
          { value: prediction["Category Description"] },
        ]);
        setData(formattedData);
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
        onSubmit={(e) => handleSubmit(e)}
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
        <div className="flex gap-2">
          <Button type="submit" disabled={!file || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          {regenerate && (
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={(e) => handleSubmit(e as any, true)}
            >
              <ArrowPathIcon className="h-5 mr-2" />
              Regenerate
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};
