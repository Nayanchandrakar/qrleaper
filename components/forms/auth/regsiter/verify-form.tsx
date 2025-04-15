"use client";

import { OTPInput } from "input-otp";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { createUserAccountAction } from "@/app/actions/auth/create-user-action";
import { Button } from "@/components/ui/button";
import { useRegisterContext } from "@/hooks/auth/useRegisterContext";
import { cn } from "@/lib/utils";
import { ResendOtpButton } from "./resend-otp-button";

const VerifyForm = () => {
	const router = useRouter();
	const isMobile = useMediaQuery("(min-width: 768px)");
	const [code, setCode] = useState("");
	const [isInvalidCode, setIsInvalidCode] = useState(false);
	const [isRedirecting, setIsRedirecting] = useState(false);

	const { email, password, name } = useRegisterContext((state) => ({
		name: state.name,
		email: state.email,
		password: state.password,
	}));

	const { executeAsync, isExecuting } = useAction(createUserAccountAction, {
		async onSuccess() {
			toast.success("Account created! Redirecting to dashboard...");
			setIsRedirecting(true);

			const response = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (response?.ok) {
				router.push("/dashboard/qr-codes");
			} else {
				toast.error("Failed to redirect to dashboard.");
			}
		},
		onError({ error }) {
			toast.error(error.serverError as string);
			setCode("");
			setIsInvalidCode(true);
		},
	});

	if (!email || !password) {
		return null;
	}

	return (
		<Card className="w-full max-w-[460px] overflow-hidden border border-gray-200 sm:rounded-2xl">
			<CardHeader className="border-gray-200 border-b p-0 py-7 text-center">
				<CardTitle className="mb-2 font-semibold text-lg">
					Verify your email address
				</CardTitle>
				<CardDescription className="text-center">
					Enter the six digit verification code sent to <br />
					{email ?? ""}
				</CardDescription>
			</CardHeader>
			<CardContent className=" bg-gray-50 px-4 pt-8 pb-4 sm:px-16">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						executeAsync({ name, email, password, code });
					}}
				>
					<div>
						<OTPInput
							maxLength={6}
							value={code}
							onChange={(code) => {
								setIsInvalidCode(false);
								setCode(code);
							}}
							autoFocus={!isMobile}
							containerClassName="group flex items-center justify-center"
							render={({ slots }) => (
								<div className="flex items-center">
									{slots.map(({ char, isActive, hasFakeCaret }, idx) => (
										<div
											key={idx}
											className={cn(
												"relative flex h-14 w-10 items-center justify-center text-xl",
												"border-gray-200 border-y border-r bg-white first:rounded-l-lg first:border-l last:rounded-r-lg",
												"ring-0 transition-all",
												isActive &&
													"z-10 border border-gray-500 ring-2 ring-gray-200",
												isInvalidCode && "border-red-500 ring-red-200",
											)}
										>
											{char}
											{hasFakeCaret && (
												<div className="pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center">
													<div className="h-5 w-px bg-black" />
												</div>
											)}
										</div>
									))}
								</div>
							)}
							onComplete={() => {
								executeAsync({ name, email, password, code });
							}}
						/>
						{isInvalidCode && (
							<p className="mt-2 text-center text-red-500 text-sm ">
								Invalid code. Please try again.
							</p>
						)}

						<Button
							className="mt-8 w-full border-gray-300 disabled:bg-gray-200"
							type="submit"
							variant="outline"
							disabled={!code || code.length < 6 || isExecuting}
						>
							{(isExecuting || isRedirecting) && (
								<Loader className="size-5 animate-spin" />
							)}
							{isExecuting ? "Verifying..." : "Continue"}
						</Button>
					</div>
				</form>
			</CardContent>

			<CardFooter className=" justify-center">
				<ResendOtpButton email={email} />
			</CardFooter>
		</Card>
	);
};

export { VerifyForm };
