"use client"

import { create } from "zustand"

interface useLoginContextProps {
  email: string
  password: string
  showPasswordField: boolean
  checkingEmailPassword: boolean
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  setShowPasswordField: (value: boolean) => void
  setCheckingEmailPassword: (value: boolean) => void
}

export const useLoginContext = create<useLoginContextProps>((set) => ({
  email: "",
  password: "",
  showPasswordField: false,
  checkingEmailPassword: false,
  setEmail: (value) => set({ email: value }),
  setPassword: (value) => set({ password: value }),
  setShowPasswordField: (value) => set({ showPasswordField: value }),
  setCheckingEmailPassword: (value) => set({ checkingEmailPassword: value }),
}))
