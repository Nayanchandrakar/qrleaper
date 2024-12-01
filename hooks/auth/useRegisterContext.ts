"use client"
import { create } from "zustand"

interface RegisterContextType {
  email: string
  name: string
  password: string
  step: "register" | "verify"
  setEmail: (email: string) => void
  setName: (value: string) => void
  setPassword: (password: string) => void
  setStep: (step: "register" | "verify") => void
}

export const useRegisterContext = create<RegisterContextType>((set) => ({
  email: "",
  password: "",
  name: "",
  step: "register",
  setEmail: (value) => set({ email: value }),
  setPassword: (value) => set({ password: value }),
  setName: (value) => set({ name: value }),
  setStep: (value) => set({ step: value }),
}))
