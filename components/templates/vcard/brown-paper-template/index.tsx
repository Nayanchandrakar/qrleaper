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
import { cn } from "@/lib/utils"
import type { qrCodevCardType } from "@/types/db-types"
import { formatAddress, shouldRenderVcardInfo } from "@/utils/client"

interface BrownVcardTemplateProps {
  vCard: qrCodevCardType
  endpoint?: string
  isPreviewMode?: boolean
}

const BrownVcardTemplate = ({
  vCard,
  endpoint = "id",
  isPreviewMode = false
}: BrownVcardTemplateProps) => {
  return (
    <section className="flex flex-col items-center gap-4 bg-[#fff]">
      <div
        className={cn(
          "mx-auto max-w-4xl overflow-hidden bg-amber-100/30",
          !isPreviewMode &&
            "my-20 rounded-2xl border border-zinc-200 pt-8 shadow-2xl shadow-black/10"
        )}
      >
        <div
          className={cn(
            "flex flex-col items-start justify-start gap-3 px-8",
            isPreviewMode && "pt-16"
          )}
        >
          <ProfileAvatar
            {...vCard}
            isPreviewMode={isPreviewMode}
            headClassName="text-black text-start"
            paraClassName="text-gray-800 "
            divClassName="items-start"
          />

          <AddToContactButton
            data={vCard!}
            endpoint={endpoint}
            isPreviewMode={isPreviewMode}
            className="bg-amber-700 hover:bg-amber-700/80"
          />
          {shouldRenderVcardInfo([
            vCard.mobileNumber,
            vCard.workEmail,
            vCard.whatsappNumber
          ]) && (
            <div className="mt-2 flex items-center gap-4">
              {vCard.mobileNumber && (
                <SocialIcon>
                  <SocialIcon.Icon
                    href={`tel:${vCard.mobileNumber}`}
                    className="size-11 bg-amber-700"
                  >
                    <Phone className="size-6 text-white" />
                  </SocialIcon.Icon>
                </SocialIcon>
              )}
              {/* FIX */}
              {vCard.workEmail && (
                <SocialIcon>
                  <SocialIcon.Icon
                    href={`mailto:${vCard.workEmail}`}
                    className="size-11 bg-amber-700"
                  >
                    <Mail className="size-6 text-white" />
                  </SocialIcon.Icon>
                </SocialIcon>
              )}

              {vCard.whatsappNumber && (
                <SocialIcon>
                  <SocialIcon.Icon
                    href={`https://wa.me/${vCard.whatsappNumber}`}
                    className="size-11 bg-amber-700"
                  >
                    <Icons.whatsapp className="size-6" color="white" />
                  </SocialIcon.Icon>
                </SocialIcon>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 w-full max-w-2xl space-y-8 border border-t border-gray-100 border-t-zinc-200 bg-white p-8">
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
              <VcardInfo.Title className="text-amber-700">
                Contact Info
              </VcardInfo.Title>
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
              <VcardInfo.Title className="text-amber-700">
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
            vCard.department
          ]) && (
            <VcardInfo>
              <VcardInfo.Title className="text-amber-700">
                Professional Information
              </VcardInfo.Title>
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
              <VcardInfo.Title className="text-amber-700">
                Additional Information
              </VcardInfo.Title>
              {vCard.note && <TextComponent text="Notes" value={vCard.note} />}
            </VcardInfo>
          )}

          {vCard?.images?.length > 0 && (
            <VcardInfo>
              <VcardInfo.Title className="text-amber-700">
                Gallery
              </VcardInfo.Title>
              {vCard.images && (
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
              )}
            </VcardInfo>
          )}

          {vCard.website && (
            <VcardInfo>
              <VcardInfo.Title className="text-amber-700">
                Website URL
              </VcardInfo.Title>
              {vCard.website && (
                <TextComponent.Link
                  text="Link"
                  link={vCard.website}
                  linkClassName="text-amber-700"
                />
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
              <VcardInfo.Title className="text-amber-700">
                Social Media
              </VcardInfo.Title>
              <div className="mt-5 flex flex-col gap-7">
                {vCard.linkedin && (
                  <SocialIcon>
                    <SocialIcon.Icon
                      className="size-11 bg-amber-700"
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
                      className="size-11 bg-amber-700"
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
                      className="size-11 bg-amber-700"
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
                      className="size-11 bg-amber-700"
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

export default BrownVcardTemplate
