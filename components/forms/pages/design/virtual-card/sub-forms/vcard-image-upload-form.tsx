"use client"

import { CloudUpload } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { ImageActionCard } from "@/components/cards/pages/design/vcard/image-action-card"
import { ListComponent } from "@/components/global/list-component"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { setValueConfig } from "@/constants/react-hook"

interface VcardImageUploadFormType {
  isExecuting?: boolean
}

export const VcardImageUploadForm = ({
  isExecuting = false
}: VcardImageUploadFormType) => {
  const { setValue, getValues, control } = useFormContext()

  const images = getValues("images") as (File | string)[]
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

  return (
    <AccordionItem className="border-b-0" value="image-upload">
      <AccordionTrigger className="rounded-lg bg-gray-100 px-2 text-gray-500 hover:no-underline">
        Images Upload
      </AccordionTrigger>
      <AccordionContent className="space-y-6 px-2 pt-4">
        <ListComponent
          data={images}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          renderItem={(file, index) => (
            <ImageActionCard
              key={index + 2}
              disabled={isExecuting}
              file={file}
              onDelete={() => onDelete(file)}
            />
          )}
        />

        {!isFileExceptLimitExceed && (
          <FormField
            control={control}
            name="images"
            disabled={isExecuting || isFileExceptLimitExceed}
            render={({
              field: { value: _value, onChange: _onChange, ...fieldProps }
            }) => (
              <FormItem>
                <FormLabel className="flex h-[10rem] w-full cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-100/60 transition duration-200 hover:bg-gray-100">
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
      </AccordionContent>
    </AccordionItem>
  )
}
