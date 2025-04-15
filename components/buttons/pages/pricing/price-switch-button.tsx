"use client";
import { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface PriceSwitchButtonProps {
	isYearly: boolean;
	setIsYearly: Dispatch<SetStateAction<boolean>>;
}

export const PriceSwitchButton = ({
	isYearly,
	setIsYearly,
}: PriceSwitchButtonProps) => {
	return (
		<div className="flex items-center justify-center gap-4 transition-colors duration-200">
			<span
				className={cn("font-semibold text-base", !isYearly && "text-green-600")}
			>
				Monthly
			</span>
			<Switch
				checked={isYearly}
				className="h-6 w-12 duration-200 data-[state=checked]:bg-green-600"
				thumbClassName="data-[state=checked]:translate-x-6 size-5"
				onCheckedChange={setIsYearly}
			/>
			<span
				className={cn("font-semibold text-base", isYearly && "text-green-600")}
			>
				Yearly
			</span>
			<Badge
				variant={isYearly ? "default" : "outline"}
				className={cn(
					"bg-white py-1 transition-colors duration-200",
					isYearly && "bg-gradient-brand",
				)}
			>
				Save 20%
			</Badge>
		</div>
	);
};
