"use client";

import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import type { qrCodevCardType } from "@/types/db-types";
import { formatAddress, shouldRenderVcardInfo } from "@/utils/client";

import { AddToContactButton } from "@/components/buttons/pages/vcard/add-to-contact-button";
import { ListComponent } from "@/components/global/list-component";
import { SocialIcon } from "@/components/templates/vcard/helpers/social-icon";
import { TextComponent } from "@/components/templates/vcard/helpers/text-component";
import { VcardImageGallery } from "@/components/templates/vcard/helpers/vcard-image-gallery";
import { VcardInfo } from "@/components/templates/vcard/helpers/vcard-info";
import { OrangeGrayProfileAvatar } from "@/components/templates/vcard/orange-gray-template/_components/orange-profile-avatar";

interface OrangeGrayTemplateProps {
	vCard: qrCodevCardType;
	endpoint?: string;
	isPreviewMode?: boolean;
}

const OrangeGrayTemplate = ({
	vCard,
	endpoint = "id",
	isPreviewMode = false,
}: OrangeGrayTemplateProps) => {
	return (
		<section className="flex flex-col items-center gap-4">
			<div
				className={cn(
					"mx-auto max-w-4xl overflow-hidden border border-zinc-100 bg-gray-100 pt-16 shadow-black/10 shadow-lg",
					!isPreviewMode && "my-20 rounded-xl",
				)}
			>
				<div className="flex flex-col items-center justify-center gap-3">
					<OrangeGrayProfileAvatar {...vCard} isPreviewMode={isPreviewMode} />

					<AddToContactButton
						data={vCard!}
						endpoint={endpoint}
						isPreviewMode={isPreviewMode}
						className="rounded-full border-[2px] border-orange-500 bg-white text-orange-500 shadow-lg shadow-orange-500/10 hover:bg-white/80 hover:shadow-orange-500/20"
					/>

					<div className="mt-4 flex w-full justify-center bg-orange-500 px-2 py-4">
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
											className="size-11 rounded-full border border-orange-200 bg-transparent"
										>
											<Phone className="size-6 text-white" />
										</SocialIcon.Icon>
									</SocialIcon>
								)}

								{vCard.workEmail && (
									<SocialIcon>
										<SocialIcon.Icon
											href={`mailto:${vCard.workEmail}`}
											className="size-11 rounded-full border border-orange-200 bg-transparent"
										>
											<Mail className="size-6 text-white" />
										</SocialIcon.Icon>
									</SocialIcon>
								)}

								{vCard.whatsappNumber && (
									<SocialIcon>
										<SocialIcon.Icon
											href={`https://wa.me/${vCard.whatsappNumber}`}
											className="size-11 rounded-full border border-orange-200 bg-transparent"
										>
											<Icons.whatsapp className="size-6" color="white" />
										</SocialIcon.Icon>
									</SocialIcon>
								)}
							</div>
						)}
					</div>
				</div>

				<div className=" mt-12 w-full max-w-2xl space-y-8 border border-gray-100 bg-white p-5 md:p-6 lg:p-8">
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
							<VcardInfo.Title className="border-y border-y-orange-500 bg-white py-2 text-center text-orange-500">
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
							<VcardInfo.Title className="border-y border-y-orange-500 bg-white py-2 text-center text-orange-500">
								Addresses
							</VcardInfo.Title>
							<TextComponent
								text="Home"
								value={formatAddress(
									vCard.homeStreet,
									vCard.homeCity,
									vCard.homeState,
									vCard.homeZip,
									vCard.homeCountry,
								)}
							/>
							<TextComponent
								text="Work"
								value={formatAddress(
									vCard.workStreet,
									vCard.workCity,
									vCard.workState,
									vCard.workZip,
									vCard.workCountry,
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
							<VcardInfo.Title className="border-y border-y-orange-500 bg-white py-2 text-center text-orange-500">
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
							<VcardInfo.Title className="border-y border-y-orange-500 bg-white py-2 text-center text-orange-500">
								Additional Information
							</VcardInfo.Title>
							{vCard.note && <TextComponent text="Notes" value={vCard.note} />}
						</VcardInfo>
					)}

					{vCard?.images?.length! > 0 && (
						<VcardInfo>
							<VcardInfo.Title className="border-y border-y-orange-500 bg-white py-2 text-center text-orange-500">
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
							<VcardInfo.Title className="border-y border-y-orange-500 bg-white py-2 text-center text-orange-500">
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
							<VcardInfo.Title className="border-y border-y-orange-500 bg-white py-2 text-center text-orange-500">
								Social Media
							</VcardInfo.Title>
							<div className="mt-5 flex flex-col gap-7">
								{vCard.linkedin && (
									<SocialIcon>
										<SocialIcon.Icon
											className="size-11 bg-orange-500"
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
											className="size-11 bg-orange-500"
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
											className="size-11 bg-orange-500"
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
											className="size-11 bg-orange-500"
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
	);
};

export default OrangeGrayTemplate;
