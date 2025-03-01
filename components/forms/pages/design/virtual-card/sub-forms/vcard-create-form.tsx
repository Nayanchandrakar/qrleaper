"use client"

import { Accordion } from "@/components/ui/accordion"
import { VcardTemplatePreview } from "@/components/cards/pages/design/vcard/vcard-template-preview"
import { AddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/addresses-section"
import { WebsiteSection } from "@/components/forms/pages/design/virtual-card/sub-forms/website-url-section"
import { PhoneNumberSection } from "@/components/forms/pages/design/virtual-card/sub-forms/phone-number-section"
import { EmailAddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/email-address-section"
import { WorkAddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/work-adddress-section"
import { VcardImageUploadForm } from "@/components/forms/pages/design/virtual-card/sub-forms/vcard-image-upload-form"
import { VcardProfileImageUploadForm } from "@/components/forms/pages/design/virtual-card/sub-forms/vcard-profile-image"
import { TemplateComponent } from "@/components/forms/pages/design/virtual-card/stepper-components/template-component"
import { SocialMediaProfileSection } from "@/components/forms/pages/design/virtual-card/sub-forms/social-media-profile-section"
import { ProfessionalInformationSection } from "@/components/forms/pages/design/virtual-card/sub-forms/professional-information-section"
import { QrCodeInfoWithNameSection } from "@/components/forms/pages/design/virtual-card/sub-forms/qr-code-info-with-name-section"

// Dynamic Component
const VcardCreateFormDynamic = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 items-start h-fit">
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
  )
}

export default VcardCreateFormDynamic
