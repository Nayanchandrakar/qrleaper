"use client";

import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { formType } from "@/types/type";

import { createVcardQrCodeAction } from "@/app/actions/pages/design/vcard/create-vcard-qr-code-action";
import { useStepper } from "@/hooks/pages/design/vcard/useStepper";
import { virtualCardFormSchemaType } from "@/zod/forms/vcard/virtual-card-form-schema";

interface useVcardCreateHandlerProps {
	form: formType;
}

export const useVcardCreateHandler = ({ form }: useVcardCreateHandlerProps) => {
	const router = useRouter();
	const { setIsFirstStep, setActiveStep, setIsLastStep } = useStepper();
	const formErrors = form?.formState?.errors;

	const handleClear = () => {
		form.reset();
		setActiveStep(0);
		setIsFirstStep(false);
		setIsLastStep(false);
	};

	const actions = useAction(createVcardQrCodeAction, {
		onSuccess: () => {
			handleClear();
			router.push("/dashboard/qr-codes");
			toast.success("Successfully created a QR Code");
		},
		onError: ({ error }) => toast.error(error.serverError),
	});

	const throwFormErrors = () => {
		if (!formErrors) return;

		Object?.keys(formErrors)?.forEach((key) => {
			const errors = formErrors[key];

			if (key === "images" && Array.isArray(errors)) {
				errors.forEach((error) => {
					toast.error(error?.message);
				});
			} else if (errors?.message) {
				toast.error(errors.message as string);
			}
		});
	};

	const onSubmit = (data: virtualCardFormSchemaType) => {
		const formData = new FormData();
		const { profileImage, images, ...remaining } = data;

		formData.append("profileImage", profileImage);

		if (images?.length) {
			images.forEach((image) => formData.append("images", image));
		}

		// @ts-ignore
		actions.executeAsync({ formData, ...remaining });
	};

	return {
		...actions,
		onSubmit,
		throwFormErrors,
	};
};
