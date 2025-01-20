"use client"

import { create } from "zustand"

interface usePreviewQrCode {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const useVcardTemplate = create<usePreviewQrCode>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}))
