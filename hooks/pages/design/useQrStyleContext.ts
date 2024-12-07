import { create } from "zustand"

export type stepTypes = "color" | "shape" | "logo" | "frame"

interface useQrStyleContextProps {
  step: stepTypes
  setStep: (value: stepTypes) => void
}

export const useQrStyleContext = create<useQrStyleContextProps>((set) => ({
  step: "color",
  setStep: (value) => set({ step: value }),
}))
