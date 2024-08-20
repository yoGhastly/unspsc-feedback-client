"use client";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Spreadsheet from "react-spreadsheet";
import { Suspense, useEffect, useRef, useState } from "react";
import { useFilePreviewerStore } from "@/app/modules/file-previewer/store";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { useToast } from "./use-toast";

interface Props {
  message: string | undefined;
  data: any[];
  onFeedback: (data: any[]) => Promise<Response | undefined>;
}

export const BlockMessage: React.FC<Props> = ({
  message,
  data,
  onFeedback,
}) => {
  const { data: currentData } = useFilePreviewerStore();
  const { toast } = useToast();

  const [hasDataChanged, setHasDataChanged] = useState(false);
  const [editedRows, setEditedRows] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const prevDataRef = useRef(data);

  const handleSubmit = async (_formData: FormData) => {
    setSubmitting(true);
    await onFeedback(editedRows);

    setHasDataChanged(false);
    setSubmitting(false);
  };

  useEffect(() => {
    if (JSON.stringify(currentData) === JSON.stringify(prevDataRef.current)) {
      setHasDataChanged(false);
    } else {
      setHasDataChanged(true);
    }
  }, [currentData]);

  useEffect(() => {
    prevDataRef.current = data;
  }, [data]);

  const handleDataChange = (newData: any[]) => {
    const editedRows = newData.filter(
      (row, index) => JSON.stringify(row) !== JSON.stringify(data[index]),
    );

    setEditedRows(editedRows);
  };

  console.log("editedRows", editedRows);

  if (!message) {
    return null;
  }

  return (
    <section className="max-w-5xl w-full flex flex-col gap-5 mx-auto p-3 rounded-md z-20 bg-[#fafafa] border">
      <div className="flex flex-col">{message}</div>
      <div className="overflow-x-auto">
        <div className="min-w-[850px] h-96">
          <Suspense fallback={<p>loading...</p>}>
            <Spreadsheet
              data={data}
              onChange={handleDataChange}
              className="w-full"
              columnLabels={[
                "Original Input",
                "UNSPSC Code",
                "UNSPSC Description",
                "Category Code",
                "Category Description",
              ]}
            />
          </Suspense>
        </div>
      </div>

      <Dialog>
        <DialogTrigger
          type="button"
          disabled={!hasDataChanged}
          className={cn(
            "w-fit flex items-center",
            { "text-gray-500 cursor-not-allowed": !hasDataChanged },
            { "text-blue-500 cursor-pointer": hasDataChanged },
            "transition-colors duration-300 ease-in-out",
          )}
        >
          <HandThumbUpIcon className="h-4 mr-2" />{" "}
          {hasDataChanged ? "Feedback" : "No Changes Made"}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              You have made changes to the generated predictions.
            </DialogTitle>
            <DialogDescription>
              Let us know how we can improve predictions by providing your
              feedback.{" "}
              <span className="font-bold">
                This will go through a review process before being implemented.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <form action={handleSubmit} id="feedback-form">
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    disabled={submitting}
                    type="submit"
                    onClick={() =>
                      toast({
                        title: "Feedback submitted",
                        description:
                          "Your feedback has been submitted successfully.",
                      })
                    }
                  >
                    {submitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
