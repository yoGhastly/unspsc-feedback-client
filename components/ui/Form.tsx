"use client";
import { Input } from "./Input";
import { Button } from "./Button";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useFormStore } from "@/app/modules/form/store/form.store";
import { useState, useTransition } from "react";
import { Switch } from "./Switch";
import { Label } from "./Label";

interface Props {
  action: (formData: FormData) => Promise<void>;
}

export const Form: React.FC<Props> = ({ action }) => {
  const [checked, setChecked] = useState(true);

  const placeholders = [
    "A desktop for personal use",
    "supplier: Artus Corp",
    "Something related to university",
    "Supplier: JTEKT TOYODA AMERICAS",
    "A screwdriver for my toolbox",
  ];

  const onCheckedChange = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <section className="max-w-xl w-full bg-[#18181B] rounded-md flex flex-col gap-4 p-3">
      <Input placeholders={placeholders} action={action} />
      <div className="mx-auto w-full max-w-lg flex gap-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="prediction-mode"
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
          <Label htmlFor="prediction-mode">
            Prediction Mode: {checked ? "ML + AI" : "AI"}
          </Label>
        </div>
      </div>
    </section>
  );
};
