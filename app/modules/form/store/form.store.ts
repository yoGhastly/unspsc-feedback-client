import { create } from "zustand";

interface Store {
  pending: boolean;
  setPending: (pending: boolean) => void;
}

export const useFormStore = create<Store>((set) => ({
  pending: true,
  setPending: (pending) => set({ pending }),
}));
