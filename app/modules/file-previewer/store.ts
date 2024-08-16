import { create } from "zustand";

interface FilePreviewerStore {
  fileUrl: string;
  setFileUrl: (fileUrl: string) => void;
}

export const useFilePreviewerStore = create<FilePreviewerStore>((set) => ({
  fileUrl: "",
  setFileUrl: (fileUrl) => set({ fileUrl }),
}));
