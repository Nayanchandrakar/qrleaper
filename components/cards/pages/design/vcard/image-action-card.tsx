"use client"

import Image from "next/image"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ImageActionCardProps {
  fileName?: string
  src: string
  disabled?: boolean
  onDelete: () => void
}

export const ImageActionCard = ({
  src,
  fileName,
  disabled = false,
  onDelete,
}: ImageActionCardProps) => {
  return (
    <div className="group flex items-center justify-center rounded-lg overflow-hidden relative h-80">
      {fileName && (
        <span className="text-black border border-gray-100 bg-white rounded-md absolute top-4 left-4 text-xs font-medium py-1.5 px-2">
          {fileName}
        </span>
      )}

      <Image
        src={src}
        width={1000}
        sizes="100vw"
        height={1000}
        className="size-full object-cover"
        alt="showcase-images"
      />

      <Button
        size="icon"
        type="button"
        onClick={onDelete}
        disabled={disabled}
        variant="destructive"
        className="absolute  top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-200 disabled:opacity-50"
      >
        <Trash className="size-4" />
      </Button>
    </div>
  )
}
