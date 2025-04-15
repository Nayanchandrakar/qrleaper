"use client";

import { Loader } from "lucide-react";
import { toast } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updatePasswordAction } from "@/app/actions/user-profile/update-password-action";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PasswordInput } from "@/components/ui/password-input";
import {
	updatePasswordSchema,
	type updatePasswordSchemaType,
} from "@/zod/auth/update-passwod-schema";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

const UpdatePasswordForm = () => {
	const form = useForm<updatePasswordSchemaType>({
		resolver: zodResolver(updatePasswordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
		},
	});

	const { executeAsync, isExecuting } = useAction(updatePasswordAction, {
		onSuccess() {
			toast.success("Successfully updated your name!");
		},
		onError({ error }) {
			toast.error(error.serverError);
		},
	});

	const onSubmit = (formData: updatePasswordSchemaType) => {
		executeAsync(formData);
	};

	const isDisabled =
		isExecuting || form.getValues("currentPassword")?.length <= 0;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-lg border border-gray-200"
			>
				<div className="px-5 pt-5 sm:px-10 sm:pt-10">
					<div className="flex flex-col space-y-3 ">
						<h2 className="font-medium text-xl">Password</h2>
						<p className="text-gray-500 text-sm">
							Manage your account password on QR Leaper.
						</p>
					</div>

					<div className="my-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
						<FormField
							control={form.control}
							name="currentPassword"
							disabled={isExecuting}
							render={({ field }) => (
								<FormItem className="w-full max-w-sm">
									<FormLabel>Current Password</FormLabel>
									<FormControl>
										<PasswordInput
											className="bg-white"
											placeholder="Password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
							disabled={isExecuting}
							render={({ field }) => (
								<FormItem className="w-full max-w-sm">
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<PasswordInput
											className="bg-white"
											placeholder="Confirm Password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="flex flex-col items-center justify-between gap-5 border-gray-200 border-t bg-gray-50 px-5 py-4 sm:flex-row sm:gap-4 sm:px-10">
					<HoverCard>
						<HoverCardTrigger className=" border-gray-500 border-b border-dashed text-gray-500 text-sm">
							Password Requirements.
						</HoverCardTrigger>
						<HoverCardContent className="max-w-2xl text-center font-normal text-gray-500 text-sm">
							Passwords must be at least 8 characters long containing at least
							one number, one uppercase, and one lowercase letter.
						</HoverCardContent>
					</HoverCard>

					<Button
						disabled={isDisabled}
						className="cursor-pointer disabled:cursor-not-allowed"
					>
						{isExecuting && <Loader className="mr-1 size-5 animate-spin" />}
						{isExecuting ? "Submitting..." : "Save Changes"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export { UpdatePasswordForm };
