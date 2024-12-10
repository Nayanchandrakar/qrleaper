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
