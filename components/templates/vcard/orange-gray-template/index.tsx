"use client"

import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import type { qrCodevCardType } from "@/types/db-types"
import { formatAddress, shouldRenderVcardInfo } from "@/utils/client"

import { ListComponent } from "@/components/global/list-component"
import { VcardInfo } from "@/components/templates/vcard/helpers/vcard-info"
import { SocialIcon } from "@/components/templates/vcard/helpers/social-icon"
import { TextComponent } from "@/components/templates/vcard/helpers/text-component"
import { AddToContactButton } from "@/components/buttons/pages/vcard/add-to-contact-button"
import { VcardImageGallery } from "@/components/templates/vcard/helpers/vcard-image-gallery"
import { OrangeGrayProfileAvatar } from "@/components/templates/vcard/orange-gray-template/_components/orange-profile-avatar"

interface OrangeGrayTemplateProps {
  vCard: qrCodevCardType
  endpoint?: string
  isPreviewMode?: boolean
}

const OrangeGrayTemplate = ({
  vCard,
  endpoint = "id",
  isPreviewMode = false,
}: OrangeGrayTemplateProps) => {
  return (
    <section className="flex items-center flex-col gap-4">
      <div
        className={cn(
          "max-w-4xl mx-auto bg-gray-100 pt-16 overflow-hidden border border-zinc-100 shadow-lg shadow-black/10",
          !isPreviewMode && "my-20 rounded-xl"
        )}
      >
        <div className="flex items-center justify-center flex-col gap-3">
          <OrangeGrayProfileAvatar {...vCard} isPreviewMode={isPreviewMode} />

          <AddToContactButton
            data={vCard!}
            endpoint={endpoint}
            isPreviewMode={isPreviewMode}
            className="bg-white text-orange-500 hover:bg-white/80 rounded-full border-[2px] border-orange-500 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20"
          />

          <div className="px-2 py-4 bg-orange-500 mt-4 w-full flex justify-center">
            {shouldRenderVcardInfo([
              vCard.mobileNumber,
              vCard.workEmail,
              vCard.whatsappNumber,
            ]) && (
              <div className="flex items-center gap-4">
                {vCard.mobileNumber && (
                  <SocialIcon>
                    <SocialIcon.Icon
                      href={`tel:${vCard.mobileNumber}`}
                      className="bg-transparent size-11 rounded-full border border-orange-200"
                    >
                      <Phone className="size-6 text-white" />
                    </SocialIcon.Icon>
                  </SocialIcon>
                )}

                {vCard.workEmail && (
                  <SocialIcon>
                    <SocialIcon.Icon
                      href={`mailto:${vCard.workEmail}`}
                      className="bg-transparent size-11 rounded-full border border-orange-200"
                    >
                      <Mail className="size-6 text-white" />
                    </SocialIcon.Icon>
                  </SocialIcon>
                )}

                {vCard.whatsappNumber && (
                  <SocialIcon>
                    <SocialIcon.Icon
                      href={`https://wa.me/${vCard.whatsappNumber}`}
                      className="bg-transparent size-11 rounded-full border border-orange-200"
                    >
                      <Icons.whatsapp className="size-6" color="white" />
                    </SocialIcon.Icon>
                  </SocialIcon>
                )}
              </div>
            )}
          </div>
        </div>

        <div className=" border border-gray-100 bg-white mt-12 p-5 md:p-6 lg:p-8 w-full max-w-2xl space-y-8">
          {shouldRenderVcardInfo([
            vCard.mobileNumber,
            vCard.workNumber,
            vCard.homeNumber,
            vCard.whatsappNumber,
            vCard.faxNumber,
            vCard.personalEmail,
            vCard.workEmail,
          ]) && (
            <VcardInfo>
              <VcardInfo.Title className="text-orange-500 border-y border-y-orange-500 bg-white text-center py-2">
                Contact Info
              </VcardInfo.Title>
              {[
                { text: "Mobile", value: vCard.mobileNumber },
                { text: "Work Phone", value: vCard.workNumber },
                { text: "Home Phone", value: vCard.homeNumber },
                { text: "WhatsApp", value: vCard.whatsappNumber },
                { text: "Fax", value: vCard.faxNumber },
                { text: "Personal Email", value: vCard.personalEmail },
                { text: "Work Email", value: vCard.workEmail },
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
            vCard.workCountry,
          ]) && (
            <VcardInfo>
              <VcardInfo.Title className="text-orange-500 border-y border-y-orange-500 bg-white text-center py-2">
                Addresses
              </VcardInfo.Title>
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
            vCard.department,
          ]) && (
            <VcardInfo>
              <VcardInfo.Title className="text-orange-500 border-y border-y-orange-500 bg-white text-center py-2">
                Professional Information
              </VcardInfo.Title>
              {[
                { text: "Company", value: vCard.company },
                { text: "Job Title", value: vCard.jobTitle },
                { text: "Department", value: vCard.department },
              ].map(({ text, value }) => (
                <TextComponent key={text} text={text} value={value} />
              ))}
            </VcardInfo>
          )}

          {vCard.note && (
            <VcardInfo>
              <VcardInfo.Title className="text-orange-500 border-y border-y-orange-500 bg-white text-center py-2">
                Additional Information
              </VcardInfo.Title>
              {vCard.note && <TextComponent text="Notes" value={vCard.note} />}
            </VcardInfo>
          )}

          {vCard?.images?.length! > 0 && (
            <VcardInfo>
              <VcardInfo.Title className="text-orange-500 border-y border-y-orange-500 bg-white text-center py-2">
                Gallery
              </VcardInfo.Title>
              {vCard.images && (
                <ListComponent
                  data={vCard.images}
                  className="flex flex-col gap-6 mt-5"
                  renderItem={(data) => (
                    <VcardImageGallery
                      imageSrc={data}
                      isPreviewMode={isPreviewMode}
                    />
                  )}
                />
              )}
            </VcardInfo>
          )}

          {vCard.website && (
            <VcardInfo>
              <VcardInfo.Title className="text-orange-500 border-y border-y-orange-500 bg-white text-center py-2">
                Website URL
              </VcardInfo.Title>
              {vCard.website && (
                <TextComponent.Link
                  text="Link"
                  link={vCard.website}
                  linkClassName="text-orange-500"
                />
              )}
            </VcardInfo>
          )}

          {shouldRenderVcardInfo([
            vCard.linkedin,
            vCard.instagram,
            vCard.twitter,
            vCard.facebook,
          ]) && (
            <VcardInfo>
              <VcardInfo.Title className="text-orange-500 border-y border-y-orange-500 bg-white text-center py-2">
                Social Media
              </VcardInfo.Title>
              <div className="flex flex-col gap-7 mt-5">
                {vCard.linkedin && (
                  <SocialIcon>
                    <SocialIcon.Icon
                      className="bg-orange-500 size-11"
                      href={vCard.linkedin}
                    >
                      <Linkedin className="size-6 text-white" />
                    </SocialIcon.Icon>

                    <VcardInfo.SubDescription>
                      Linkedin
                    </VcardInfo.SubDescription>
                  </SocialIcon>
                )}

                {vCard.instagram && (
                  <SocialIcon>
                    <SocialIcon.Icon
                      className="bg-orange-500 size-11"
                      href={vCard.instagram}
                    >
                      <Instagram className="size-6 text-white" />
                    </SocialIcon.Icon>

                    <VcardInfo.SubDescription>
                      Instagram
                    </VcardInfo.SubDescription>
                  </SocialIcon>
                )}

                {vCard.twitter && (
                  <SocialIcon>
                    <SocialIcon.Icon
                      className="bg-orange-500 size-11"
                      href={vCard.twitter}
                    >
                      <Icons.XCom className="size-5 fill-white" />
                    </SocialIcon.Icon>

                    <VcardInfo.SubDescription>
                      X(Twitter)
                    </VcardInfo.SubDescription>
                  </SocialIcon>
                )}

                {vCard.facebook && (
                  <SocialIcon>
                    <SocialIcon.Icon
                      className="bg-orange-500 size-11"
                      href={vCard.facebook}
                    >
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

export default OrangeGrayTemplate
