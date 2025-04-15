"use client";

import { create } from "zustand";

interface emailChangeContextProps {
	newEmail: string;
	step: "input" | "verification";
	setNewEmail: (email: string) => void;
	setStep: (step: "input" | "verification") => void;
}

export const useEmailChangeContext = create<emailChangeContextProps>((set) => ({
	newEmail: "",
	step: "input",
	setNewEmail: (value) => set({ newEmail: value }),
	setStep: (value) => set({ step: value }),
}));
