export const getFilePath = (fileName: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/view?fileName=${fileName}`
}
