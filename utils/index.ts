import "server-only"

export const getEndpointURL = (id: string) => {
  return `${process.env.APP_URL}/link?id=${id}`
}

export const getMessageDbEndpointURL = (
  phoneNumber: string,
  message?: string
) => {
  if (message?.length! > 1) {
    return `sms:${phoneNumber}?&body=${encodeURIComponent(message!)}`
  }
  return `sms:${phoneNumber}?&body=messagehere`
}

export const getEmailDbEndpointURL = (
  email: string,
  subject?: string,
  message?: string
) => {
  return `mailto:${email}?subject=${encodeURIComponent(
    subject!
  )}&body=${encodeURIComponent(message!)}`
}

export const getInstagramDbEndpointURL = (id: string) => {
  return `https://www.instagram.com/${id?.substring(1)}`
}

export const getFileDbEndpointURL = (fileName: string) => {
  return `${process.env.APP_URL}/api/view?fileName=${fileName}&download=true`
}
