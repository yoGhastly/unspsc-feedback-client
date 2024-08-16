import { create } from "zustand";

interface Store {
  pending: boolean;
  setPending: (pending: boolean) => void;
  formMessage?: string;
  setFormMessage: (formMessage: string) => void;
}

export const useFormStore = create<Store>((set) => ({
  pending: true,
  setPending: (pending) => set({ pending }),
  formMessage: undefined,
  setFormMessage: (formMessage) => set({ formMessage }),
}));
