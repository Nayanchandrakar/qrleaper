"use client"

import { create } from "zustand"

interface useStepperProps {
  activeStep: number
  isLastStep: boolean
  isFirstStep: boolean
  setActiveStep: (value: number) => void
  setIsLastStep: (value: boolean) => void
  setIsFirstStep: (value: boolean) => void
  onNext: () => void
  onPrev: () => void
}

export const useStepper = create<useStepperProps>((set) => ({
  activeStep: 0,
  isLastStep: false,
  isFirstStep: false,
  setActiveStep: (value) => set({ activeStep: value }),
  setIsLastStep: (value) => set({ isLastStep: value }),
  setIsFirstStep: (value) => set({ isFirstStep: value }),
  onNext: () => set((state) => ({ activeStep: state.activeStep + 1 })),
  onPrev: () => set((state) => ({ activeStep: state.activeStep - 1 })),
}))
