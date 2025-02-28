"use client"

import { useMemo } from "react"

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
    [imageSrc, isPreviewMode]
  )

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      key={imageSrc}
      src={data!}
      alt="Gallery Image"
      className="rounded-lg size-full"
    />
  )
}
