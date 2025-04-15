import { CircleCheckBig } from "lucide-react";

import { PricingButton } from "@/components/buttons/pages/pricing/pricing-button";
import { ListComponent } from "@/components/global/list-component";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { pricingDataType } from "@/constants/pages/pricing/pricing-data";
import { cn } from "@/lib/utils";
import type { subscritpionTableType } from "@/types/db-types";

interface PricingCardProps {
	data: pricingDataType;
	isYearly: boolean;
	subscriptionPlan: subscritpionTableType;
	userId: string;
}

const PricingCard = ({
	data,
	isYearly,
	subscriptionPlan,
	userId,
}: PricingCardProps) => {
	return (
		<Card
			className={cn(
				"relative flex flex-col justify-between overflow-hidden rounded-xl shadow-black/10 shadow-lg",
				data?.recommended && "border-2 border-green-600",
			)}
		>
			{data?.recommended && (
				<span className="absolute right-0 size-fit rounded-bl-lg bg-gradient-brand px-3 py-2 font-semibold text-white text-xs">
					Recommended
				</span>
			)}
			<CardHeader>
				<CardTitle className="font-semibold text-base text-gray-800">
					{data?.title}
				</CardTitle>
				<div className="flex gap-1 py-4">
					<h3
						className={cn(
							"font-bold text-4xl text-black",
							data?.recommended &&
								"bg-gradient-brand bg-clip-text text-transparent",
						)}
					>
						${isYearly ? data?.yearlyPrice : data?.monthlyPrice}
					</h3>
					<span
						className={cn(
							"mb-1 flex flex-col justify-end font-semibold text-sm",
							data?.recommended && "text-green-800",
						)}
					>
						/mo
					</span>
				</div>

				<Separator />
				<CardDescription className="py-2">{data?.description}</CardDescription>
				<Separator />
			</CardHeader>
			<CardContent>
				<ListComponent
					data={data?.features}
					className="flex flex-col items-start gap-3"
					renderItem={(features) => (
						<span className="flex items-start gap-3" key={features}>
							<CircleCheckBig className="size-5 flex-shrink-0 text-green-700" />
							<CardDescription>{features}</CardDescription>
						</span>
					)}
				/>
			</CardContent>
			<CardFooter>
				<PricingButton
					data={data}
					isYearly={isYearly}
					subscriptionPlan={subscriptionPlan}
					userId={userId}
				/>
			</CardFooter>
		</Card>
	);
};

export { PricingCard };
