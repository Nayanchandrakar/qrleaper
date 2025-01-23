"use client"

import { VcardTemplatePreview } from "@/components/cards/pages/design/vcard/vcard-template-preview"
import { QrCodeInfoWithNameSection } from "@/components/forms/pages/design/virtual-card/sub-forms/qr-code-info-with-name-section"
import { PhoneNumberSection } from "@/components/forms/pages/design/virtual-card/sub-forms/phone-number-section"
import { EmailAddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/email-address-section"
import { AddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/addresses-section"
import { WorkAddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/work-adddress-section"
import { WebsiteSection } from "@/components/forms/pages/design/virtual-card/sub-forms/website-url-section"
import { ProfessionalInformationSection } from "@/components/forms/pages/design/virtual-card/sub-forms/professional-information-section"
import { AdditionalInformationSection } from "@/components/forms/pages/design/virtual-card/sub-forms/additional-information-section"
import { VcardImageUploadForm } from "@/components/forms/pages/design/virtual-card/sub-forms/vcard-image-upload-form"
import { SocialMediaProfileSection } from "@/components/forms/pages/design/virtual-card/sub-forms/social-media-profile-section"
import { VcardProfileImageUploadForm } from "@/components/forms/pages/design/virtual-card/sub-forms/vcard-profile-image"

// Dynamic Component
const VcardCreateFormDynamic = () => {
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

export default VcardCreateFormDynamic
