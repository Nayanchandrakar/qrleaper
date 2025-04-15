import { redirect } from "next/navigation";

import { isSubscriptionExpired, subscriptionPlan } from "@/app/actions/helpers";
import { getSubscriptionByUserId } from "@/app/actions/utils";
import { Container } from "@/components/global/container";
import { ShowBillingInfo } from "@/components/pages/dashboard/billing/show-billing-info";
import { auth } from "@/lib/auth/auth";
import { stripe } from "@/lib/stripe";

export const metadata = {
	title: "Your Billing Page",
};

const BillingPage = async () => {
	const session = await auth();

	let subscription;

	if (session?.user?.id) {
		subscription = await getSubscriptionByUserId(session?.user.id!);
	} else {
		redirect("/login");
	}

	const plan = subscriptionPlan(subscription?.stripePriceId!);
	const isPaid = !!(
		subscription?.stripePriceId &&
		isSubscriptionExpired(subscription?.stripeCurrentPeriodEnd!)
	);

	let isCanceled = false;

	if (isPaid && subscription?.stripeSubscriptionId!) {
		const stripePlan = await stripe.subscriptions.retrieve(
			subscription.stripeSubscriptionId,
		);
		isCanceled = stripePlan.cancel_at_period_end;
	}

	return (
		<Container className="my-8 ">
			<ShowBillingInfo
				isCanceled={isCanceled}
				isPaid={isPaid}
				subscription={subscription!}
				description={plan.message}
				planType={plan.type}
			/>
		</Container>
	);
};

export default BillingPage;
