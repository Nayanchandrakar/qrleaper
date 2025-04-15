"use client";

import { Button } from "@/components/ui/button";
import { Loader, Sparkles } from "lucide-react";

interface QrControlProps {
	isExecuting: boolean;
}

export const QrControls = ({ isExecuting }: QrControlProps) => {
	return (
		<Button
			type="submit"
			style={{ marginTop: "1.5rem" }}
			disabled={isExecuting}
		>
			{isExecuting ? (
				<Loader className="size-5 animate-spin" />
			) : (
				<Sparkles className="size-5" />
			)}
			Generate QR Code
		</Button>
	);
};
