"use client"

import { useMemo } from "react"
import Image from "next/image"

import { getObjectFileSrc } from "@/utils/client"

interface VcardImageGalleryProps {
  imageSrc: string
  isPreviewMode: boolean
}

export const VcardImageGallery = ({
  imageSrc,
  isPreviewMode,
}: VcardImageGalleryProps) => {
  const data = useMemo(
    () => getObjectFileSrc(isPreviewMode, imageSrc),
    [imageSrc]
  )

  return (
    <Image
      key={imageSrc}
      src={data!}
      alt="Gallery Image"
      width={1000}
      height={1000}
      sizes="100vw"
      className="rounded-lg"
    />
  )
}
