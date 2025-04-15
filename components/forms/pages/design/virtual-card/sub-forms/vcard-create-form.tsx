"use client";

import { VcardTemplatePreview } from "@/components/cards/pages/design/vcard/vcard-template-preview";
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
import { Accordion } from "@/components/ui/accordion";

// Dynamic Component
const VcardCreateFormDynamic = () => {
	return (
		<div className="grid h-fit grid-cols-1 items-start gap-8 lg:grid-cols-[60%_40%]">
			<Accordion
				type="single"
				collapsible
				className="space-y-7"
				defaultValue="basic-information"
			>
				<TemplateComponent />
				<VcardProfileImageUploadForm />
				<QrCodeInfoWithNameSection />
				<PhoneNumberSection />
				<EmailAddressSection />
				<AddressSection />
				<WorkAddressSection />
				<WebsiteSection />
				<ProfessionalInformationSection />
				<SocialMediaProfileSection />
				<VcardImageUploadForm />
			</Accordion>
			<VcardTemplatePreview />
		</div>
	);
};

export default VcardCreateFormDynamic;
