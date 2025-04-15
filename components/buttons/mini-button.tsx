"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface MiniButtonProps extends HTMLAttributes<HTMLButtonElement> {
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
}

export const MiniButton = ({
	className,
	children,
	type = "button",
	disabled = false,
	...props
}: MiniButtonProps) => {
	return (
		<button
			className={cn(
				"bg-black hover:bg-black/90 transition-colors duration-200 text-white  px-5 py-2 font-medium rounded-full text-sm disabled:cursor-not-allowed  disabled:opacity-50 disabled:pointer-events-none",
				className,
			)}
			disabled={disabled}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
};
