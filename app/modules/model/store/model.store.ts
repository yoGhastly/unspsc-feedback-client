import { ModelResponse } from "@/app/types/api";
import { create } from "zustand";

interface ModelStore {
  pending: boolean;
  setPending: (pending: boolean) => void;
  modelResponse: ModelResponse | null;
  setModelResponse: (modelResponse: ModelResponse) => void;
}

export const useModelStore = create<ModelStore>((set) => ({
  pending: false,
  setPending: (pending) => set({ pending }),
  modelResponse: null,
  setModelResponse: (modelResponse) => set({ modelResponse }),
}));
