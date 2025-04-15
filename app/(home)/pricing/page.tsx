import { getSubscriptionByUserId } from "@/app/actions/utils";
import { PricingComponent } from "@/components/pages/pricing";
import { Icons } from "@/components/shared/icons";
import { auth } from "@/lib/auth/auth";

export const metadata = {
	title: "Our Subscription Plans",
};

const PricingPage = async () => {
	const session = await auth();

	let subscriptionPlan;

	if (session?.user?.id && session?.user.email) {
		subscriptionPlan = await getSubscriptionByUserId(session?.user.id);
	}

	return (
		<section>
			<Icons.gridPattern className="fixed inset-0 z-[-1]" />
			<PricingComponent
				subscriptionPlan={subscriptionPlan!}
				userId={session?.user?.id!}
			/>
		</section>
	);
};

export default PricingPage;
