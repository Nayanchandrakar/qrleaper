import axios from "axios"

import { deleteFile } from "./deleteFile"
import { getPreSignedUrl } from "./getPreSignedUrl"

export const uploadFile = async (file: File) => {
  const { newFileName, url } = await getPreSignedUrl(file.name, file.type)

  await axios.put(url, file, {
    headers: { "Content-Type": file.type },
  })
  return { newFileName, url }
}

export const updateFile = async (fileKey: string, file: File) => {
  const [, response] = await Promise.all([
    deleteFile(fileKey),
    uploadFile(file),
  ])
  return response
}

export const uploadBulkFiles = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map((file) =>
    uploadFile(file).then((res) => res?.newFileName || null)
  )
  const results = await Promise.all(uploadPromises)
  return results.filter((name): name is string => name !== null)
}

export const deleteBulkFiles = async (filekeys: string[]) => {
  if (filekeys.length > 0) return
  await Promise.all(filekeys.map((key) => deleteFile(key)))
}
