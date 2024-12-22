export const getFilePath = (fileName: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/view?fileName=${fileName}`
}

export const getEndpointURLClient = (id: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/link?id=${id}`
}

export const formatAddress = (...texts: (string | null | undefined)[]) => {
  return texts.filter(Boolean).join(", ")
}

export const getProfileImage = (image: File | string) => {
  if (!image) return ""

  if (typeof image === "string") {
    return getFilePath(image)
  } else {
    return URL?.createObjectURL(image)
  }
}
