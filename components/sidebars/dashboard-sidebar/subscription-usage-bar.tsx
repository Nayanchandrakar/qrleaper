import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import Link from "next/link";

import { subscriptionPlan } from "@/app/actions/helpers";
import { Button } from "@/components/ui/button";
import type { subscritpionTableType } from "@/types/db-types";

interface SubscriptionUsageBarProps {
	subscription: subscritpionTableType;
}

export const SubscriptionUsageBar = ({
	subscription,
}: SubscriptionUsageBarProps) => {
	const plan = subscriptionPlan(subscription?.stripePriceId!);

	return (
		<div className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4">
			<div className="mb-2.5 flex items-center justify-between gap-2 font-medium text-neutral-600 text-xs">
				<span>Usage</span>
				<span>
					{subscription?.count || 0}/{plan.limit}
				</span>
			</div>

			<Progress
				className="h-2"
				value={((subscription?.count! || 0) / plan.limit!) * 100}
			/>

			{plan?.type !== "Pro" && (
				<Button asChild className="mt-4 bg-gradient-brand">
					<Link href="/pricing">
						<Sparkles className="size-5 fill-white" />
						Upgrade
					</Link>
				</Button>
			)}
		</div>
	);
};
