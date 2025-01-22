"use client"

import { WebsiteSection } from "./vcard-section-forms/website-url-section"
import { PhoneNumberSection } from "./vcard-section-forms/phone-number-section"
import { WorkAddressSection } from "./vcard-section-forms/work-adddress-section"
import { EmailAddressSection } from "./vcard-section-forms/email-address-section"
import { AdditionalInformationSection } from "./vcard-section-forms/additional-information-section"
import { VcardTemplatePreview } from "@/components/cards/pages/design/vcard/vcard-template-preview"
import { AddressSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/addresses-section"
import { VcardImageUploadForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-image-upload-form"
import { VcardProfileImageUploadForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-profile-image"
import { QrCodeInfoWithNameSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/qr-code-info-with-name-section"
import { ProfessionalInformationSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/professional-information-section"
import { SocialMediaProfileSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/social-media-profile-section"

const VirtualCardForm = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60%_38%] gap-8 items-start">
      <div className="space-y-7">
        <VcardProfileImageUploadForm />
        <QrCodeInfoWithNameSection />
        <PhoneNumberSection />
        <EmailAddressSection />
        <AddressSection />
        <WorkAddressSection />
        <WebsiteSection />
        <ProfessionalInformationSection />
        <SocialMediaProfileSection />
        <AdditionalInformationSection />
        <VcardImageUploadForm />
      </div>
      <VcardTemplatePreview />
    </div>
  )
}

export default VirtualCardForm
