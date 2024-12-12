export const getFilePath = (fileName: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/view?fileName=${fileName}`
}

export const getEndpointURLClient = (id: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/link?id=${id}`
}
