"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { FormEvent, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card";
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form";
import { QrEditControl } from "@/components/forms/pages/edit/design/qr-edit-controls";
import { Accordion } from "@/components/ui/accordion";
import { useQrDataContext } from "@/hooks/qr/useQrDataContext";
import { editQrVcardType } from "@/types/type";
import {
	vCardEditFormSchema,
	type vCardEditFormSchemaType,
} from "@/zod/pages/edit/vcard/vcard-edit-form-schema";

import { updateQrCodeVcardAction } from "@/app/actions/pages/edit/vcard/update-qr-code-vcard-action";
import { TemplateComponent } from "@/components/forms/pages/design/virtual-card/stepper-components/template-component";
import { AddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/addresses-section";
import { EmailAddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/email-address-section";
import { PhoneNumberSection } from "@/components/forms/pages/design/virtual-card/sub-forms/phone-number-section";
import { ProfessionalInformationSection } from "@/components/forms/pages/design/virtual-card/sub-forms/professional-information-section";
import { QrCodeInfoWithNameSection } from "@/components/forms/pages/design/virtual-card/sub-forms/qr-code-info-with-name-section";
import { SocialMediaProfileSection } from "@/components/forms/pages/design/virtual-card/sub-forms/social-media-profile-section";
import { VcardImageUploadForm } from "@/components/forms/pages/design/virtual-card/sub-forms/vcard-image-upload-form";
import { VcardProfileImageUploadForm } from "@/components/forms/pages/design/virtual-card/sub-forms/vcard-profile-image";
import { WebsiteSection } from "@/components/forms/pages/design/virtual-card/sub-forms/website-url-section";
import { WorkAddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/work-adddress-section";

interface VcardEditFormProps {
	qrCode: editQrVcardType;
	endpoint: string;
}

export const VcardEditForm = ({ qrCode, endpoint }: VcardEditFormProps) => {
	const { setData } = useQrDataContext();

	const { executeAsync, isExecuting } = useAction(updateQrCodeVcardAction, {
		onSuccess: () => {
			toast.success("Successfully updated a QR Code");
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	const form = useForm<vCardEditFormSchemaType>({
		resolver: zodResolver(vCardEditFormSchema),
		defaultValues: qrCode as vCardEditFormSchemaType,
	});

	const userNameError = form.getFieldState("userName")?.error;

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (userNameError) {
			toast.error(userNameError.message);
			return;
		}

		form.handleSubmit((data) => {
			const formData = new FormData();

			const { profileImage, images, ...remaining } = data;

			if (
				typeof profileImage === "string" ||
				typeof profileImage === "object"
			) {
				formData.append("profileImage", profileImage);
			}

			if (Array.isArray(images)) {
				images.forEach((image) => {
					if (typeof image === "string" || typeof image === "object") {
						formData.append("images", image);
					}
				});
			}

			// @ts-ignore
			executeAsync({ formData, ...remaining });
		})(event);
	};

	useEffect(() => {
		if (endpoint) {
			setData(endpoint);
		}
	}, [endpoint, setData]);

	return (
		<FormProvider {...form}>
			<form
				onSubmit={onSubmit}
				className="grid grid-cols-1 gap-8 lg:grid-cols-2"
			>
				<div>
					<Accordion
						type="single"
						collapsible
						defaultValue="basic-information"
						className="space-y-7"
					>
						<TemplateComponent />
						<VcardProfileImageUploadForm isExecuting={isExecuting} />
						<QrCodeInfoWithNameSection isExecuting={isExecuting} isEditForm />
						<PhoneNumberSection isExecuting={isExecuting} />
						<EmailAddressSection isExecuting={isExecuting} />
						<AddressSection isExecuting={isExecuting} />
						<WorkAddressSection isExecuting={isExecuting} />
						<WebsiteSection isExecuting={isExecuting} />
						<ProfessionalInformationSection isExecuting={isExecuting} />
						<SocialMediaProfileSection isExecuting={isExecuting} />
						<VcardImageUploadForm isExecuting={isExecuting} />
						<QrEditControl
							isExecuting={isExecuting}
							isEditable={
								JSON.stringify(form.getValues()) === JSON.stringify(qrCode)
							}
						/>
					</Accordion>
					<QrStyleForm />
				</div>

				<PreviewQrCard />
			</form>
		</FormProvider>
	);
};
