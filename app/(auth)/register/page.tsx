import { RegisterPageClient } from "@/components/pages/auth/register/page-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create your QR Leaper account",
};

const RegisterPage = () => {
	return <RegisterPageClient />;
};

export default RegisterPage;
