"use client"

import { create } from "zustand"

interface useQrDataContextProps {
  data: string | null
  setData: (value: string | null) => void
}

export const useQrDataContext = create<useQrDataContextProps>((set) => ({
  data: null,
  setData: (value) => set({ data: value }),
}))
