"use client";

import { UpdateEmailForm } from "@/components/forms/user-profile/update-email-form";
import { VerifyEmailChangeForm } from "@/components/forms/user-profile/verify-email-change-form";
import { useEmailChangeContext } from "@/hooks/auth/useEmailChangeContext";

export const EmailChangeComponent = () => {
	const step = useEmailChangeContext((state) => state.step);

	if (step === "input") return <UpdateEmailForm />;
	if (step === "verification") return <VerifyEmailChangeForm />;

	return null;
};
