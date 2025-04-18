"use client";

import { KeyRound, Loader, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { checkAccountExists } from "@/app/actions/auth/account-exists";
import GoogleOauth from "@/components/buttons/google-oauth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { errorCodes } from "@/constants/auth/error-codes";
import { useLoginContext } from "@/hooks/auth/useLoginContext";
import { emailSchema } from "@/zod/utils";

const LoginForm = () => {
	const {
		checkingEmailPassword,
		email,
		password,
		setCheckingEmailPassword,
		setEmail,
		setPassword,
		setShowPasswordField,
		showPasswordField,
	} = useLoginContext((state) => ({
		email: state.email,
		password: state.password,
		showPasswordField: state.showPasswordField,
		checkingEmailPassword: state.checkingEmailPassword,
		setEmail: state.setEmail,
		setPassword: state.setPassword,
		setShowPasswordField: state.setShowPasswordField,
		setCheckingEmailPassword: state.setCheckingEmailPassword,
	}));

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!showPasswordField) {
			const { success } = emailSchema.safeParse({ email });

			if (success) {
				try {
					setCheckingEmailPassword(true);
					// Call server action directly
					const accountInfo = await checkAccountExists(email);
					setCheckingEmailPassword(false);

					if (accountInfo?.accountExists && accountInfo?.hasPassword) {
						setShowPasswordField(true);
						return;
					}

					if (!accountInfo?.accountExists) {
						toast.error("No account found with that email address.");
						return;
					}
				} catch (error) {
					console.error("Failed to determine if user has password", error);
					toast.error("Server failed. Please try again later.");
					return;
				}
			}
		}

		setCheckingEmailPassword(true);
		try {
			// Call server action to get account details
			const accountInfo = await checkAccountExists(email);

			if (!accountInfo?.accountExists) {
				toast.error("No account found with that email address.");
				return;
			}

			const provider =
				accountInfo?.hasPassword && password ? "credentials" : "resend";

			// Call server action for signing in
			const response = await signIn(provider, {
				email,
				...(password && { password }),
				redirect: false,
			});

			if (response?.ok && !response?.error && provider === "credentials") {
				window.location.href = "/dashboard/qr-codes";
			} else {
				toast.error(errorCodes["invalid-credentials"]);
			}

			if (provider === "resend") {
				toast.success("Email sent - check your inbox!");
				setEmail("");
				return;
			}
		} catch (error) {
			console.error("An error occurred during sign-in:", error);
			toast.error("Server failed. Please try again later.");
		} finally {
			setCheckingEmailPassword(false);
		}
	};

	return (
		<Card className="w-full max-w-[460px] overflow-hidden border border-gray-200 sm:rounded-2xl">
			<CardHeader className="p-0 text-center">
				<CardTitle className="border-gray-200 border-b py-7 font-semibold text-lg">
					Sign in to your QR account
				</CardTitle>
			</CardHeader>
			<CardContent className=" bg-gray-50 px-4 pt-8 pb-4 sm:px-16">
				<form onSubmit={onSubmit} className="space-y-5">
					<Input
						disabled={checkingEmailPassword}
						placeholder="andrew@adson.com"
						id="email"
						name="email"
						autoFocus={!showPasswordField}
						type="email"
						autoComplete="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						size={1}
					/>

					{showPasswordField && (
						<PasswordInput
							disabled={checkingEmailPassword}
							onChange={(e) => setPassword(e?.target?.value)}
							placeholder="Password (optional)"
							value={password}
						/>
					)}

					<Button
						disabled={checkingEmailPassword}
						className="w-full"
						type="submit"
					>
						{checkingEmailPassword ? (
							<Loader className="size-5 animate-spin" />
						) : password ? (
							<KeyRound className="mr-1 size-5" />
						) : (
							<Mail className="mr-1 size-5" />
						)}
						Continue with {password ? "Password" : "Email"}
					</Button>
				</form>

				{showPasswordField && (
					<div className="mt-4 flex items-center justify-center">
						<Link
							href="/forgot-password"
							className="text-center text-gray-500 text-xs transition-colors hover:text-black"
						>
							Forgot password?
						</Link>
					</div>
				)}

				<div className="flex flex-shrink items-center justify-center gap-2 py-6">
					<div className="grow basis-0 border-gray-300 border-b" />
					<span className="font-normal text-gray-500 text-xs uppercase leading-none">
						or
					</span>
					<div className="grow basis-0 border-gray-300 border-b" />
				</div>

				<GoogleOauth />
			</CardContent>

			<CardFooter className=" justify-center">
				<p className="mt-4 text-center text-gray-500 text-sm">
					Don&apos;t have an account?&nbsp;
					<Link
						href="/register"
						className="font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black"
					>
						Sign up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export { LoginForm };
