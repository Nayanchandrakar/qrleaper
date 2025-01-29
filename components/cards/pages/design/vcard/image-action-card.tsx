"use client"

import Image from "next/image"
import { useMemo } from "react"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getFileName, getProfileImage } from "@/utils/client"

interface ImageActionCardProps {
  disabled?: boolean
  onDelete: () => void
  file: File | string
}

export const ImageActionCard = ({
  disabled = false,
  onDelete,
  file,
}: ImageActionCardProps) => {
  const { fileName, imageSrc } = useMemo(() => {
    return {
      fileName: getFileName(file),
      imageSrc: getProfileImage(file),
    }
  }, [file])

  return (
    <div className="group flex items-center justify-center rounded-lg overflow-hidden relative h-80">
      <div className="absolute top-4 w-full h-fit px-4 flex items-center justify-between gap-4">
        {fileName && (
          <span className="text-black border border-gray-100 bg-white rounded-md text-xs font-medium py-2 px-2  truncate">
            {fileName}
          </span>
        )}

        <Button
          size="icon"
          type="button"
          onClick={onDelete}
          disabled={disabled}
          variant="destructive"
          className="opacity-0 group-hover:opacity-100 transition duration-200 disabled:opacity-50 flex-shrink-0"
        >
          <Trash className="size-4" />
        </Button>
      </div>

      <Image
        src={imageSrc}
        width={1000}
        sizes="100vw"
        height={1000}
        className="size-full object-cover"
        alt="showcase-images"
      />
    </div>
  )
}
