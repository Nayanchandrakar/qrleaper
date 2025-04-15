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
				<div className="pt-5 px-5 sm:pt-10 sm:px-10">
					<div className="flex flex-col space-y-3 ">
						<h2 className="text-xl font-medium">Password</h2>
						<p className="text-sm text-gray-500">
							Manage your account password on QR Leaper.
						</p>
					</div>

					<div className="flex flex-col  sm:flex-row items-center justify-between gap-4 my-6">
						<FormField
							control={form.control}
							name="currentPassword"
							disabled={isExecuting}
							render={({ field }) => (
								<FormItem className="max-w-sm w-full">
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
								<FormItem className="max-w-sm w-full">
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

				<div className="border-t border-gray-200 flex items-center gap-5 sm:gap-4 sm:flex-row flex-col justify-between bg-gray-50 py-4 px-5 sm:px-10">
					<HoverCard>
						<HoverCardTrigger className=" text-gray-500 text-sm border-b border-dashed border-gray-500">
							Password Requirements.
						</HoverCardTrigger>
						<HoverCardContent className="max-w-2xl text-sm font-normal text-gray-500 text-center">
							Passwords must be at least 8 characters long containing at least
							one number, one uppercase, and one lowercase letter.
						</HoverCardContent>
					</HoverCard>

					<Button
						disabled={isDisabled}
						className="cursor-pointer disabled:cursor-not-allowed"
					>
						{isExecuting && <Loader className="size-5 mr-1 animate-spin" />}
						{isExecuting ? "Submitting..." : "Save Changes"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export { UpdatePasswordForm };
