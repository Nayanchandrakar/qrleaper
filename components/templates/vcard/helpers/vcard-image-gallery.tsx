"use client"

import { useMemo } from "react"

import { getObjectFileSrc } from "@/utils/client"

interface VcardImageGalleryProps {
  imageSrc: string
  isPreviewMode: boolean
}

export const VcardImageGallery = ({
  imageSrc,
  isPreviewMode
}: VcardImageGalleryProps) => {
  const data = useMemo(
    () => getObjectFileSrc(isPreviewMode, imageSrc),
    [imageSrc, isPreviewMode]
  )

  return (
    // oxlint-disable-next-line nextjs/no-img-element -- dynamic blob/object URLs are not compatible with next/image
    <img
      key={imageSrc}
      src={data!}
      alt="Gallery Image"
      className="size-full rounded-lg"
    />
  )
}
