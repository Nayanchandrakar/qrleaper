"use client";

import { Input } from "@/components/ui/input";

interface VanityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export default function VanityInput({ label, ...props }: VanityInputProps) {
	return (
		<div className="flex rounded-lg shadow-black/5 shadow-sm">
			<span className="flex flex-shrink-0 items-center rounded-s-lg border border-input bg-background px-3 text-muted-foreground text-sm">
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
