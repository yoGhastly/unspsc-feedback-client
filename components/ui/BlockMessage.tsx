"use client";
import { Feedback, ModelResponse } from "@/app/types/api";
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
import { useState, useEffect } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
  message: ModelResponse | null;
  onFeedback: (formData: FormData) => Promise<void>;
}

export const BlockMessage: React.FC<Props> = ({ message, onFeedback }) => {
  const [feedback, setFeedback] = useState<Feedback>({
    unspsc_code: "",
    unspsc_description: "",
    new_unspsc_code: "",
    new_unspsc_description: "",
  });
  const { pending } = useFormStore();

  useEffect(() => {
    if (message) {
      setFeedback({
        unspsc_code: message.unspsc_code || "",
        unspsc_description: message.unspsc_description || "",
        new_unspsc_code: "",
        new_unspsc_description: "",
      });
    }
  }, [message]);

  const onCodeChange = (newCode: string) => {
    setFeedback((prev) => ({ ...prev, new_unspsc_code: newCode }));
  };

  const onDescriptionChange = (newDescription: string) => {
    setFeedback((prev) => ({
      ...prev,
      new_unspsc_description: newDescription,
    }));
  };

  if (!message) {
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    formData.append("unspsc_code", feedback.unspsc_code || "");
    formData.append("unspsc_description", feedback.unspsc_description || "");
    formData.append("new_unspsc_code", feedback.new_unspsc_code);
    formData.append("new_unspsc_description", feedback.new_unspsc_description);

    await onFeedback(formData);
  };

  return (
    <section className="max-w-2xl w-full flex flex-col gap-5 mx-auto p-3 rounded-md z-20 bg-[#fafafa] border">
      <div className="flex flex-col">
        <p>UNSPSC Code: {feedback.unspsc_code}</p>
        <p>UNSPSC Description: {feedback.unspsc_description}</p>
      </div>
      <Dialog>
        <DialogTrigger className="w-fit">
          <Button size="sm" type="button" disabled={pending} className="w-fit">
            <HandThumbUpIcon className="h-4 mr-2" /> Feedback
          </Button>
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
                  value={feedback.unspsc_code}
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
                  value={feedback.unspsc_description}
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
                  onChange={(e) => onCodeChange(e.target.value)}
                  maxLength={9}
                  minLength={8}
                  value={feedback.new_unspsc_code}
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
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  maxLength={100}
                  minLength={1}
                  value={feedback.new_unspsc_description}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  form="feedback-form"
                  disabled={
                    feedback.new_unspsc_code === "" ||
                    feedback.new_unspsc_description === ""
                  }
                >
                  Submit Feedback
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
