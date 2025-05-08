import { create } from 'zustand';

interface ImagePreviewState {
  isOpen: boolean;
  imageUrl: string | null;
  onOpen: (url: string) => void;
  onClose: () => void;
}

export const useImagePreview = create<ImagePreviewState>((set) => ({
  isOpen: false,
  imageUrl: null,
  onOpen: (url: string) => set({ isOpen: true, imageUrl: url }),
  onClose: () => set({ isOpen: false, imageUrl: null }),
}));