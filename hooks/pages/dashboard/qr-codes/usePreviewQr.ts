"use client";

import type { qrCardType } from "@/types/type";
import { create } from "zustand";

interface usePreviewQrCode {
	isOpen: boolean;
	data: qrCardType | null;
	setIsOpen: (value: boolean) => void;
	setData: (value: qrCardType) => void;
}

export const usePreviewQrCode = create<usePreviewQrCode>((set) => ({
	data: null,
	isOpen: false,
	setData: (value) => set({ data: value }),
	setIsOpen: (value) => set({ isOpen: value }),
}));
