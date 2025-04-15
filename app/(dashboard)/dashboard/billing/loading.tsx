import { Container } from "@/components/global/container";
import { BillingSkeleton } from "@/components/skeletons/pages/dashboard/billing/billing-page-skeleton";

const BillingPageSkeleton = () => {
	return (
		<Container className="my-8 ">
			<BillingSkeleton />
		</Container>
	);
};

export default BillingPageSkeleton;
