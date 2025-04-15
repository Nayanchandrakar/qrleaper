import VcardJsLib from "vcards-js"

import { getFilePath } from "@/utils/client"

// biome-ignore lint/suspicious/noExplicitAny:
export function generateVCard(data: any) {
  const vCard = VcardJsLib()

  vCard.firstName = data.firstName ?? ""
  vCard.lastName = data.lastName ?? ""
  vCard.namePrefix = data.prefix ?? ""
  vCard.nameSuffix = data.suffix ?? ""
  vCard.email = data.personalEmail ?? ""
  vCard.homePhone = data.homeNumber ?? ""
  vCard.cellPhone = data.mobileNumber ?? ""
  vCard.homeFax = data.faxNumber ?? ""
  vCard.workPhone = data.workNumber ?? ""
  vCard.workFax = data.faxNumber ?? ""
  vCard.title = data.jobTitle ?? ""
  vCard.organization = data.company ?? ""
  vCard.role = data.department ?? ""
  vCard.note = data.note ?? ""

  vCard.homeAddress = {
    city: data.homeCity ?? "",
    countryRegion: data.homeCountry ?? "",
    postalCode: data.homeZip ?? "",
    street: data.homeStreet ?? "",
    stateProvince: data.homeState ?? "",
    label: "Home Address",
  }

  vCard.workAddress = {
    city: data.workCity ?? "",
    countryRegion: data.workCountry ?? "",
    postalCode: data.workZip ?? "",
    street: data.workStreet ?? "",
    stateProvince: data.workState ?? "",
    label: "Work Address",
  }

  vCard.socialUrls = {
    facebook: data.facebook ?? "",
    linkedIn: data.linkedin ?? "",
    twitter: data.twitter ?? "",
    flickr: "",
  }

  vCard.socialUrls["whatsappNumber"] = data.whatsappNumber ?? ""
  vCard.socialUrls["website"] = data.website ?? ""

  vCard.source = data.endpoint ?? ""
  vCard.url = data.endpoint ?? ""
  vCard.workUrl = data.endpoint ?? ""

  if (data.profileImage) {
    vCard.photo.attachFromUrl(
      getFilePath(data.profileImage),
      data.profileImage.split(".").pop() || "jpg"
    )
  }

  return vCard
}
