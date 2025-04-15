"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { verifyEmailChange } from "@/app/actions/user-profile/verify-email-change-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailChangeContext } from "@/hooks/auth/useEmailChangeContext";
import {
	verifyEmailChangeSchema,
	verifyEmailChangeSchemaType,
} from "@/zod/auth/email-change-schema";

export const VerifyEmailChangeForm = () => {
	const { newEmail, setStep } = useEmailChangeContext((state) => ({
		newEmail: state.newEmail,
		setStep: state.setStep,
	}));

	const { update } = useSession();

	const form = useForm<verifyEmailChangeSchemaType>({
		resolver: zodResolver(verifyEmailChangeSchema),
		defaultValues: {
			token: "",
			newEmail,
		},
	});

	const { executeAsync, isExecuting } = useAction(verifyEmailChange, {
		onSuccess() {
			update();
			setStep("input");
			toast.success(`Successfully updated email address!`);
		},
		onError({ error }) {
			toast.error(error.serverError);
		},
	});

	const onSubmit = (formData: verifyEmailChangeSchemaType) => {
		executeAsync(formData);
	};

	const isDisabled = !!(form.getValues("token")?.length <= 0 || isExecuting);

	if (!newEmail) {
		return null;
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-lg border border-gray-200"
			>
				<div className="px-5 pt-5 sm:px-10 sm:pt-10">
					<div className="flex flex-col space-y-3 ">
						<h2 className="font-medium text-xl">Verify Your Email</h2>
						<p className="text-gray-500 text-sm">
							This will be the email you use to log in to QR Leaper and receive
							notifications.
						</p>
					</div>

					<div className="my-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
						<input
							id="newEmail"
							name="newEmail"
							value={newEmail}
							{...form.register}
							required
							type="hidden"
						/>

						<FormField
							control={form.control}
							name="token"
							disabled={isExecuting}
							render={({ field }) => (
								<FormItem className="w-full max-w-sm">
									<FormLabel>Your Otp</FormLabel>
									<FormControl>
										<Input
											className="bg-white"
											placeholder="Your Code"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="flex flex-col items-center justify-end gap-5 border-gray-200 border-t bg-gray-50 px-5 py-4 sm:flex-row sm:gap-4 sm:px-10">
					<Button
						disabled={isDisabled}
						type="submit"
						className="cursor-pointer disabled:cursor-not-allowed"
					>
						{isExecuting && <Loader className="mr-1 size-5 animate-spin" />}
						{isExecuting ? "Submitting..." : "Continue"}
					</Button>
				</div>
			</form>
		</Form>
	);
};
