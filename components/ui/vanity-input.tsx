"use client";

import { Input } from "@/components/ui/input";

interface VanityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export default function VanityInput({ label, ...props }: VanityInputProps) {
	return (
		<div className="flex rounded-lg shadow-sm shadow-black/5">
			<span className="flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground flex-shrink-0">
				{label}
			</span>
			<Input
				className="-ms-px rounded-s-none shadow-none"
				placeholder="google.com"
				type="text"
				{...props}
			/>
		</div>
	);
}
