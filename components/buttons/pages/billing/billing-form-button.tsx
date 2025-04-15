"use client";

import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { generateUserStripeAction } from "@/app/actions/pages/pricing/generate-user-stripe";
import { Button } from "@/components/ui/button";
import { pricingDataType } from "@/constants/pages/pricing/pricing-data";
import { cn } from "@/lib/utils";
import type { subscritpionTableType } from "@/types/db-types";

interface BillingFormButtonProps {
	offer: pricingDataType;
	subscriptionPlan: subscritpionTableType;
	year: boolean;
}

export function BillingFormButton({
	year,
	offer,
	subscriptionPlan,
}: BillingFormButtonProps) {
	const stripePriceId = offer?.stripeIds[year ? "yearly" : "monthly"]!;
	const userOffer = subscriptionPlan?.stripePriceId === stripePriceId;

	const { executeAsync, isExecuting } = useAction(generateUserStripeAction, {
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	return (
		<Button
			className={cn("mt-6 w-full", offer.recommended && "bg-gradient-brand")}
			disabled={isExecuting}
			onClick={() =>
				executeAsync({
					priceId: stripePriceId,
					optionalEndpoint: "/dashboard/billing",
				})
			}
		>
			{isExecuting ? (
				<>
					<Loader className="mr-2 size-4 animate-spin" /> Loading...
				</>
			) : (
				<>{userOffer ? "Manage Subscription" : "Upgrade"}</>
			)}
		</Button>
	);
}
