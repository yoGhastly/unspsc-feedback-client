"use client";
import { ModelResponse } from "@/app/types/api";
import { Button } from "./Button";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useFormStore } from "@/app/modules/form/store/form.store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Label } from "./Label";
import { ModalInput } from "./ModalInput";
import { DialogClose } from "@radix-ui/react-dialog";
import { SheetViewer } from "react-office-viewer";
import { useFilePreviewerStore } from "@/app/modules/file-previewer/store";

interface Props {
  message: string | undefined;
  onFeedback: (formData: FormData) => Promise<void>;
}

export const BlockMessage: React.FC<Props> = ({ message, onFeedback }) => {
  const { pending } = useFormStore();
  const { fileUrl } = useFilePreviewerStore();

  if (!message) {
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    await onFeedback(formData);
  };

  return (
    <section className="max-w-2xl w-full flex flex-col gap-5 mx-auto p-3 rounded-md z-20 bg-[#fafafa] border">
      <div className="flex flex-col">{message}</div>
      <SheetViewer file={fileUrl} />
      <Dialog>
        <DialogTrigger
          type="button"
          className="w-fit flex items-center cursor-pointer hover:text-blue-500 transition-colors duration-200 ease-in-out"
        >
          <HandThumbUpIcon className="h-4 mr-2" /> Feedback
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Help Us Improve Our Predictions</DialogTitle>
            <DialogDescription>
              Let us know how we can improve this prediction by providing your
              feedback.
            </DialogDescription>
          </DialogHeader>
          <form action={handleSubmit} id="feedback-form">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unspsc_code" className="text-right text-black">
                  Code
                </Label>
                <ModalInput
                  id="unspsc_code"
                  name="unspsc_code"
                  disabled
                  value={""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="unspsc_description"
                  className="text-right text-black"
                >
                  Description
                </Label>
                <ModalInput
                  id="unspsc_description"
                  name="unspsc_description"
                  disabled
                  value={""}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="new_unspsc_code"
                  className="text-right text-black"
                >
                  New Code
                </Label>
                <ModalInput
                  id="new_unspsc_code"
                  name="new_unspsc_code"
                  type="text"
                  onChange={(e) => {}}
                  maxLength={9}
                  minLength={8}
                  value={""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="new_unspsc_description"
                  className="text-right text-black"
                >
                  New Description
                </Label>
                <ModalInput
                  id="new_unspsc_description"
                  name="new_unspsc_description"
                  onChange={(e) => {}}
                  maxLength={100}
                  minLength={1}
                  value={""}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose
                asChild
                type="submit"
                form="feedback-form"
                disabled={pending}
              >
                Submit Feedback
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
