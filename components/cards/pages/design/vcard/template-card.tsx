"use client"

import Image from "next/image"
import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"
import { CarouselItem } from "@/components/ui/carousel"

interface TemplateSelectCardProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc: string
}

export const TemplateSelectCard = ({
  className,
  imageSrc,
  ...props
}: TemplateSelectCardProps) => {
  return (
    <CarouselItem
      className={cn(
        "md:basis-1/2 h-[25rem] border-[3px] rounded-lg flex items-center justify-center pl-0 transition-all duration-200  border-zinc-200 cursor-pointer",
        className
      )}
      {...props}
    >
      <Image
        src={imageSrc}
        width={1000}
        height={1000}
        sizes="100vw"
        alt="template-image"
        className="object-top object-cover size-full rounded-lg"
      />
    </CarouselItem>
  )
}
