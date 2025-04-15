"use client";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";

import { checkVCardUserNameAction } from "@/app/actions/utils/pages/vcard/check-username-action";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import VanityInput from "@/components/ui/vanity-input";
import { appUrl } from "@/constants/config";
import { cn } from "@/lib/utils";
import type { userNameInputType } from "@/types/type";
import { validInputClassName, validateInput } from "@/utils/username-valid";

interface UserNameInputProps {
	isExecuting: boolean;
	isEditForm?: boolean;
}
export const UserNameInput = ({
	isExecuting,
	isEditForm = false,
}: UserNameInputProps) => {
	const { control, setError, getValues, clearErrors, getFieldState } =
		useFormContext();

	const userNameError = getFieldState("userName")?.error;
	const defaultUserName = getValues("userName") as string;
	const [debouncedValue, setValue] = useDebounceValue(defaultUserName, 300);

	const handleError = (message?: string) => {
		if (!message) {
			clearErrors("userName");
			return;
		}

		setError("userName", { message, type: "validate" }, { shouldFocus: false });
	};

	const handleValidation = (data: userNameInputType) => {
		if (isEditForm) {
			if (!data.result) {
				handleError();
				return;
			}

			if (
				data.result === data.currentUserName &&
				data.result === defaultUserName
			) {
				handleError();
				return;
			}

			if (data.result) {
				handleError("username already in use.");
				return;
			}
		} else {
			if (!data.result) {
				handleError();
				return;
			}

			if (data.result === data.currentUserName && data.result) {
				handleError("username already in use.");
				return;
			}

			handleError();
		}
	};

	const { executeAsync, isExecuting: checkingUserName } = useAction(
		checkVCardUserNameAction,
		{
			onSuccess: ({ data }) => handleValidation(data!),
		},
	);
	const isUserNameAvailable = !!(
		!checkingUserName &&
		debouncedValue &&
		!userNameError?.message
	);

	useEffect(() => {
		if (debouncedValue && debouncedValue.length > 3) {
			executeAsync({ userName: debouncedValue });
		}
	}, [debouncedValue, executeAsync]);

	return (
		<div className="flex flex-col gap-3">
			<FormField
				control={control}
				name="userName"
				disabled={isExecuting}
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Username</FormLabel>
						<FormControl>
							<VanityInput
								label={`${appUrl}/vcard/`}
								placeholder="Your Unique username"
								{...field}
								onChange={(e) => {
									field.onChange(e);
									setValue(e.target.value);
								}}
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<p
				className={cn(
					"text-sm font-medium text-gray-600",
					validInputClassName(
						!!userNameError,
						checkingUserName,
						isUserNameAvailable,
					),
				)}
			>
				{checkingUserName ? (
					<span className="flex items-center gap-1">
						<Loader className="animate-spin size-3" /> checking username...
					</span>
				) : (
					validateInput(userNameError?.message!, isUserNameAvailable)
				)}
			</p>
		</div>
	);
};
