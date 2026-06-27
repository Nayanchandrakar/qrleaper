"use client"

import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react"

import { AddToContactButton } from "@/components/buttons/pages/vcard/add-to-contact-button"
import { ListComponent } from "@/components/global/list-component"
import { Icons } from "@/components/shared/icons"
import { ProfileAvatar } from "@/components/templates/vcard/helpers/profile-avatar"
import { SocialIcon } from "@/components/templates/vcard/helpers/social-icon"
import { TextComponent } from "@/components/templates/vcard/helpers/text-component"
import { VcardImageGallery } from "@/components/templates/vcard/helpers/vcard-image-gallery"
import { VcardInfo } from "@/components/templates/vcard/helpers/vcard-info"
import type { qrCodevCardType } from "@/types/db-types"
import { formatAddress, shouldRenderVcardInfo } from "@/utils/client"

interface CorePreviewComponentProps {
  vCard: qrCodevCardType
  endpoint?: string
  isPreviewMode?: boolean
}

const CorePreviewComponentDynamic = ({
  vCard,
  endpoint = "id",
  isPreviewMode = false
}: CorePreviewComponentProps) => {
  return (
    <section className="relative size-full">
      {/* Only show mesh on non preview mode  */}
      {!isPreviewMode && <div className="design-mesh fixed z-[-1] size-full" />}

      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-20">
        <div className="flex flex-col items-center justify-center gap-3">
          <ProfileAvatar {...vCard} isPreviewMode={isPreviewMode} />

          <AddToContactButton
            data={vCard!}
            endpoint={endpoint}
            isPreviewMode={isPreviewMode}
          />
          {shouldRenderVcardInfo([
            vCard.mobileNumber,
            vCard.workEmail,
            vCard.whatsappNumber
          ]) && (
            <div className="mt-4 flex items-center gap-4">
              {vCard.mobileNumber && (
                <SocialIcon>
                  <SocialIcon.Icon href={`tel:${vCard.mobileNumber}`}>
                    <Phone className="size-6 text-white" />
                  </SocialIcon.Icon>
                </SocialIcon>
              )}
              {/* FIX */}
              {vCard.workEmail && (
                <SocialIcon>
                  <SocialIcon.Icon href={`mailto:${vCard.workEmail}`}>
                    <Mail className="size-6 text-white" />
                  </SocialIcon.Icon>
                </SocialIcon>
              )}

              {vCard.whatsappNumber && (
                <SocialIcon>
                  <SocialIcon.Icon
                    href={`https://wa.me/${vCard.whatsappNumber}`}
                  >
                    <Icons.whatsapp className="size-6 text-white" />
                  </SocialIcon.Icon>
                </SocialIcon>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 w-full max-w-lg space-y-8 rounded-lg border border-gray-100 bg-white p-8">
          {shouldRenderVcardInfo([
            vCard.mobileNumber,
            vCard.workNumber,
            vCard.homeNumber,
            vCard.whatsappNumber,
            vCard.faxNumber,
            vCard.personalEmail,
            vCard.workEmail
          ]) && (
            <VcardInfo>
              <VcardInfo.Title>Contact Info</VcardInfo.Title>
              {[
                { text: "Mobile", value: vCard.mobileNumber },
                { text: "Work Phone", value: vCard.workNumber },
                { text: "Home Phone", value: vCard.homeNumber },
                { text: "WhatsApp", value: vCard.whatsappNumber },
                { text: "Fax", value: vCard.faxNumber },
                { text: "Personal Email", value: vCard.personalEmail },
                { text: "Work Email", value: vCard.workEmail }
              ]?.map(({ text, value }) => (
                <TextComponent key={text} text={text} value={value} />
              ))}
            </VcardInfo>
          )}

          {shouldRenderVcardInfo([
            vCard.homeStreet,
            vCard.homeCity,
            vCard.homeState,
            vCard.homeZip,
            vCard.homeCountry,
            vCard.workStreet,
            vCard.workCity,
            vCard.workState,
            vCard.workZip,
            vCard.workCountry
          ]) && (
            <VcardInfo>
              <VcardInfo.Title>Addresses</VcardInfo.Title>
              <TextComponent
                text="Home"
                value={formatAddress(
                  vCard.homeStreet,
                  vCard.homeCity,
                  vCard.homeState,
                  vCard.homeZip,
                  vCard.homeCountry
                )}
              />
              <TextComponent
                text="Work"
                value={formatAddress(
                  vCard.workStreet,
                  vCard.workCity,
                  vCard.workState,
                  vCard.workZip,
                  vCard.workCountry
                )}
              />
            </VcardInfo>
          )}

          {shouldRenderVcardInfo([
            vCard.company,
            vCard.jobTitle,
            vCard.department
          ]) && (
            <VcardInfo>
              <VcardInfo.Title>Professional Information</VcardInfo.Title>
              {[
                { text: "Company", value: vCard.company },
                { text: "Job Title", value: vCard.jobTitle },
                { text: "Department", value: vCard.department }
              ].map(({ text, value }) => (
                <TextComponent key={text} text={text} value={value} />
              ))}
            </VcardInfo>
          )}

          {vCard.note && (
            <VcardInfo>
              <VcardInfo.Title>Additional Information</VcardInfo.Title>
              {vCard.note && <TextComponent text="Notes" value={vCard.note} />}
            </VcardInfo>
          )}

          {vCard.images && vCard.images.length > 0 && (
            <VcardInfo>
              <VcardInfo.Title>Gallery</VcardInfo.Title>
              <ListComponent
                data={vCard.images}
                className="mt-5 flex flex-col gap-6"
                renderItem={(data) => (
                  <VcardImageGallery
                    imageSrc={data}
                    isPreviewMode={isPreviewMode}
                  />
                )}
              />
            </VcardInfo>
          )}

          {vCard.website && (
            <VcardInfo>
              <VcardInfo.Title>Website URL</VcardInfo.Title>
              {vCard.website && (
                <TextComponent.Link text="Link" link={vCard.website} />
              )}
            </VcardInfo>
          )}

          {shouldRenderVcardInfo([
            vCard.linkedin,
            vCard.instagram,
            vCard.twitter,
            vCard.facebook
          ]) && (
            <VcardInfo>
              <VcardInfo.Title>Social Media</VcardInfo.Title>
              <div className="mt-5 flex flex-col gap-7">
                {vCard.linkedin && (
                  <SocialIcon>
                    <SocialIcon.Icon href={vCard.linkedin}>
                      <Linkedin className="size-6 text-white" />
                    </SocialIcon.Icon>

                    <VcardInfo.SubDescription>
                      Linkedin
                    </VcardInfo.SubDescription>
                  </SocialIcon>
                )}

                {vCard.instagram && (
                  <SocialIcon>
                    <SocialIcon.Icon href={vCard.instagram}>
                      <Instagram className="size-6 text-white" />
                    </SocialIcon.Icon>

                    <VcardInfo.SubDescription>
                      Instagram
                    </VcardInfo.SubDescription>
                  </SocialIcon>
                )}

                {vCard.twitter && (
                  <SocialIcon>
                    <SocialIcon.Icon href={vCard.twitter}>
                      <Icons.XCom className="size-5 fill-white" />
                    </SocialIcon.Icon>

                    <VcardInfo.SubDescription>
                      X(Twitter)
                    </VcardInfo.SubDescription>
                  </SocialIcon>
                )}

                {vCard.facebook && (
                  <SocialIcon>
                    <SocialIcon.Icon href={vCard.facebook}>
                      <Facebook className="size-5 text-white" />
                    </SocialIcon.Icon>

                    <VcardInfo.SubDescription>
                      Facebook
                    </VcardInfo.SubDescription>
                  </SocialIcon>
                )}
              </div>
            </VcardInfo>
          )}
        </div>
      </div>
    </section>
  )
}

export default CorePreviewComponentDynamic
