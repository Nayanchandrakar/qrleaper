export const createDownloadInstance = (
  fileName: string,
  fileExtension: string,
  // oxlint-disable-next-line typescript/no-explicit-any
  href: any
) => {
  const link = document.createElement("a")
  link.href = href
  link.download = `${fileName}.${fileExtension}`
  document.body.appendChild(link)
  link.click()

  // Clear memory after download
  URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}
