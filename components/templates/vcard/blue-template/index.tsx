"use client"

import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import type { qrCodevCardType } from "@/types/db-types"
import { formatAddress, shouldRenderVcardInfo } from "@/utils/client"

import { ListComponent } from "@/components/global/list-component"
import { VcardInfo } from "@/components/templates/vcard/helpers/vcard-info"
import { SocialIcon } from "@/components/templates/vcard/helpers/social-icon"
import { ProfileAvatar } from "@/components/templates/vcard/helpers/profile-avatar"
import { TextComponent } from "@/components/templates/vcard/helpers/text-component"
import { AddToContactButton } from "@/components/buttons/pages/vcard/add-to-contact-button"
import { VcardImageGallery } from "@/components/templates/vcard/helpers/vcard-image-gallery"

interface BlueVcardTemplateProps {
  vCard: qrCodevCardType
  endpoint?: string
  isPreviewMode?: boolean
}

const BlueVcardTemplate = ({
  vCard,
  endpoint = "id",
  isPreviewMode = false,
}: BlueVcardTemplateProps) => {
  return (
    <section className="flex items-center flex-col gap-4 bg-sky-100">
      <div
        className={cn(
          "max-w-4xl mx-auto bg-blue-500 pt-16 overflow-hidden",
          !isPreviewMode && "my-20 rounded-xl"
        )}
      >
        <div className="flex items-center justify-center flex-col gap-3">
          <ProfileAvatar
            {...vCard}
            isPreviewMode={isPreviewMode}
            headClassName="text-white"
            paraClassName="text-white"
          />

          <AddToContactButton
            data={vCard!}
            endpoint={endpoint}
            isPreviewMode={isPreviewMode}
            className="bg-white text-blue-500 hover:bg-white/80"
          />
          {shouldRenderVcardInfo([
            vCard.mobileNumber,
            vCard.workEmail,
            vCard.whatsappNumber,
          ]) && (
            <div className="flex items-center gap-4 mt-4">
              {vCard.mobileNumber && (
                <SocialIcon>
                  <SocialIcon.Icon
                    href={`tel:${vCard.mobileNumber}`}
                    className="bg-white rounded-lg"
                  >
                    <Phone className="size-6 text-blue-500" />
                  </SocialIcon.Icon>
                </SocialIcon>
              )}
              {/* FIX */}
              {vCard.workEmail && (
                <SocialIcon>
                  <SocialIcon.Icon
                    href={`mailto:${vCard.workEmail}`}
                    className="bg-white rounded-lg"
                  >
                    <Mail className="size-6 text-blue-500" />
                  </SocialIcon.Icon>
                </SocialIcon>
              )}

              {vCard.whatsappNumber && (
                <SocialIcon>
                  <SocialIcon.Icon
                    href={`https://wa.me/${vCard.whatsappNumber}`}
                    className="bg-white rounded-lg"
                  >
                    <Icons.whatsapp className="size-6" color="#3b82f6" />
                  </SocialIcon.Icon>
                </SocialIcon>
              )}
            </div>
          )}
        </div>

        <div className=" border border-gray-100 bg-white p-8 mt-12 w-full max-w-2xl space-y-8">
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
              <VcardInfo.Title className="text-blue-500">
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
              <VcardInfo.Title className="text-blue-500">
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
              <VcardInfo.Title className="text-blue-500">
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
              <VcardInfo.Title className="text-blue-500">
                Additional Information
              </VcardInfo.Title>
              {vCard.note && <TextComponent text="Notes" value={vCard.note} />}
            </VcardInfo>
          )}

          {vCard?.images?.length! > 0 && (
            <VcardInfo>
              <VcardInfo.Title className="text-blue-500">
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
              <VcardInfo.Title className="text-blue-500">
                Website URL
              </VcardInfo.Title>
              {vCard.website && (
                <TextComponent.Link
                  text="Link"
                  link={vCard.website}
                  linkClassName="text-blue-500"
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
              <VcardInfo.Title className="text-blue-500">
                Social Media
              </VcardInfo.Title>
              <div className="flex flex-col gap-7 mt-5">
                {vCard.linkedin && (
                  <SocialIcon>
                    <SocialIcon.Icon
                      className="bg-blue-500 rounded-lg"
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
                      className="bg-blue-500 rounded-lg"
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
                      className="bg-blue-500 rounded-lg"
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
                      className="bg-blue-500 rounded-lg"
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

export default BlueVcardTemplate
