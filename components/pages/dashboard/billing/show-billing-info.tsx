import dayjs from "dayjs";
import Link from "next/link";

import { CustomerPortalButton } from "@/components/buttons/pages/billing/customer-portal-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { subscritpionTableType } from "@/types/db-types";

interface ShowBillingInfoProps {
	isCanceled: boolean;
	isPaid: boolean;
	description: string;
	planType: string;
	subscription: subscritpionTableType;
}

export const ShowBillingInfo = ({
	description,
	isCanceled,
	isPaid,
	planType,
	subscription,
}: ShowBillingInfoProps) => {
	return (
		<div className="rounded-lg border border-gray-200">
			<div className="px-5 pt-5 sm:px-10 sm:pt-10">
				<div className="flex flex-col space-y-3 ">
					<h2 className="font-medium text-xl">Subscription Plan</h2>
					<p className="text-gray-500 text-sm">
						You are currently on the <strong>{planType}</strong> plan.
					</p>
				</div>

				<p className="my-6 text-gray-800 text-sm">{description}</p>
			</div>

			<div className="flex items-center justify-between gap-2 border-gray-200 border-t bg-gray-50 px-5 py-4 sm:px-10">
				{isPaid && (
					<p className="text-gray-500 text-sm">
						{isCanceled
							? "Your plan will be canceled on "
							: "Your plan renews on "}
						{dayjs(subscription.stripeCurrentPeriodEnd)?.format(
							"MMMM DD, YYYY",
						)}
						.
					</p>
				)}

				{isPaid && subscription?.stripeCustomerId ? (
					<CustomerPortalButton
						userStripeId={subscription?.stripeCustomerId!}
					/>
				) : (
					<Link href="/pricing" className={cn(buttonVariants())}>
						Choose a plan
					</Link>
				)}
			</div>
		</div>
	);
};
