import { LoginForm } from "@/components/forms/auth/login/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login to your QR Leaper account",
};

const LoginPage = () => {
	return <LoginForm />;
};

export default LoginPage;
