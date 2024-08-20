import { create } from "zustand";

interface FilePreviewerStore {
  data: any[];
  setData: (data: any[]) => void;
}

export const useFilePreviewerStore = create<FilePreviewerStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
