"use client"

import { create } from "zustand"
import type { qrCardType } from "@/types/type"

interface usePreviewQrCode {
  isOpen: boolean
  data: qrCardType | null
  setIsOpen: (value: boolean) => void
  setData: (value: qrCardType) => void
}

export const usePreviewQrCode = create<usePreviewQrCode>((set) => ({
  data: null,
  isOpen: false,
  setData: (value) => set({ data: value }),
  setIsOpen: (value) => set({ isOpen: value }),
}))
