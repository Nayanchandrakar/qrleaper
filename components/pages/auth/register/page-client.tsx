"use client";

import { RegisterForm } from "@/components/forms/auth/regsiter/register-form";
import { VerifyForm } from "@/components/forms/auth/regsiter/verify-form";
import { useRegisterContext } from "@/hooks/auth/useRegisterContext";

const RegisterPageClient = () => {
	const step = useRegisterContext((state) => state.step);

	if (step === "register") return <RegisterForm />;
	if (step === "verify") return <VerifyForm />;

	return null;
};

export { RegisterPageClient };
