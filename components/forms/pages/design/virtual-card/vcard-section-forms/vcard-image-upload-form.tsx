"use client"

import { toast } from "sonner"
import { useEffect } from "react"
import { CloudUpload } from "lucide-react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { setValueConfig } from "@/constants/react-hook"
import { ListComponent } from "@/components/global/list-component"
import { VCardLabelCard } from "@/components/cards/pages/design/vcard/vcard-label-card"
import { ImageActionCard } from "@/components/cards/pages/design/vcard/image-action-card"
import { getFileName, getProfileImage } from "@/utils/client"

interface VcardImageUploadFormType {
  isExecuting: boolean
}

export const VcardImageUploadForm = ({
  isExecuting,
}: VcardImageUploadFormType) => {
  const { setValue, getValues, formState, control } = useFormContext()

  const images = getValues("images") as (File | string)[]
  const formErrors = formState?.errors
  const isFileExceptLimitExceed = !!(images?.length >= 4)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const previousFiles = images || []
      const newFiles = [...previousFiles, file]
      setValue("images", newFiles, setValueConfig)
    }
  }

  const onDelete = (newFile: File | string) => {
    const previousFiles = images.filter((file) => {
      if (typeof file === "object" && typeof newFile === "object") {
        return file.name !== newFile.name
      }
      if (typeof file === "string" && typeof newFile === "string") {
        return file !== newFile
      }
      return true
    })

    setValue("images", previousFiles, setValueConfig)
  }

  useEffect(() => {
    if (!formErrors) return

    Object?.keys(formErrors)?.forEach((key) => {
      const errors = formErrors[key]

      if (key === "images" && Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error?.message)
        })
      } else if (errors?.message) {
        toast.error(errors.message as string)
      }
    })
  }, [formErrors])

  return (
    <div className="space-y-3">
      <VCardLabelCard>Images Upload</VCardLabelCard>

      <ListComponent
        data={images}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        renderItem={(file, index) => (
          <ImageActionCard
            key={index + 2}
            disabled={isExecuting}
            fileName={getFileName(file)}
            src={getProfileImage(file)}
            onDelete={() => onDelete(file)}
          />
        )}
      />

      {!isFileExceptLimitExceed && (
        <FormField
          control={control}
          name="images"
          disabled={isExecuting || isFileExceptLimitExceed}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel className="w-full flex items-center justify-center bg-gray-100/60 rounded-md  border border-gray-200 h-24 transition duration-200 hover:bg-gray-100 cursor-pointer  flex-col">
                <CloudUpload className="size-8 text-gray-400" />
              </FormLabel>
              <FormControl>
                <input
                  hidden
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={handleOnChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
