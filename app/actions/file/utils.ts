import axios from "axios"
import { getPreSignedUrl } from "./getPreSignedUrl"
import { deleteFile } from "./deleteFile"

export const uploadFile = async (file: File) => {
  const { newFileName, url } = await getPreSignedUrl(file.name, file.type)

  await axios.put(url, file, {
    headers: { "Content-Type": file.type },
  })
  return { newFileName, url }
}

export const updateFile = async (fileKey: string, file: File) => {
  await deleteFile(fileKey)
  const response = await uploadFile(file)
  return response
}
