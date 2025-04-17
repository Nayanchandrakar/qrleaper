"use client";

import { useFormContext } from "react-hook-form";

import { PhoneFrame } from "@/components/global/phone-frame";
import type { qrCodevCardType } from "@/types/db-types";
import { getTemplateComponent } from "@/utils/pages/design/vcard";

export const VcardTemplatePreview = () => {
	const { getValues } = useFormContext();
	const formValues = getValues();

	const TemplateComponent = getTemplateComponent(formValues?.templateId);

	return (
		<div className="sticky top-[10.5rem] flex h-fit items-center justify-center">
			<PhoneFrame>
				<TemplateComponent
					vCard={formValues as qrCodevCardType}
					isPreviewMode
				/>
			</PhoneFrame>
		</div>
	);
};
