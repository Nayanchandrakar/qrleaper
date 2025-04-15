"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ColorCardProps extends HTMLAttributes<HTMLDivElement> {
	color: string;
	currentColor: string;
	onClick: () => void;
}

const ColorCard = ({ color, currentColor, ...props }: ColorCardProps) => {
	return (
		<div
			style={{ backgroundColor: color }}
			className={cn(
				"size-9 cursor-pointer rounded-md transition-all duration-200",
				color === currentColor
					? "ring-4 ring-green-700"
					: "hover:border-[3px] hover:border-white hover:ring-2 hover:ring-zinc-400",
			)}
			{...props}
		/>
	);
};

export default ColorCard;
