"use client";

import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { openCustomerPortal } from "@/app/actions/pages/pricing/open-customer-portal";
import { Button } from "@/components/ui/button";

interface CustomerPortalButtonProps {
	userStripeId: string;
}

export const CustomerPortalButton = ({
	userStripeId,
}: CustomerPortalButtonProps) => {
	const { isExecuting, executeAsync } = useAction(openCustomerPortal, {
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	return (
		<Button
			className="cursor-pointer disabled:cursor-not-allowed"
			disabled={isExecuting}
			onClick={() => executeAsync({ id: userStripeId })}
		>
			Customer Portal
			{isExecuting && <Loader className="mr-1 size-5 animate-spin" />}
		</Button>
	);
};
