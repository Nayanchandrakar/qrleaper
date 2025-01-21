import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

/* eslint-disable  @typescript-eslint/no-empty-object-type */
interface VcardInfoProps extends HTMLAttributes<HTMLDivElement> {}
interface VcardInfoTitleProps extends HTMLAttributes<HTMLParagraphElement> {}

export const VcardInfo = ({
  className,
  children,
  ...props
}: VcardInfoProps) => {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  )
}

const VcardInfoTitle = ({
  className,
  children,
  ...props
}: VcardInfoTitleProps) => {
  return (
    <p
      className={cn("text-base font-semibold text-green-700", className)}
      {...props}
    >
      {children}
    </p>
  )
}

const VcardInfoGridWrap = ({
  className,
  children,
  ...props
}: VcardInfoProps) => {
  return (
    <div
      className={cn("grid grid-cols-[40%_60%] gap-4 mt-5", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const VcardInfoSubTitle = ({
  className,
  children,
  ...props
}: VcardInfoTitleProps) => {
  return (
    <p
      className={cn("text-sm font-medium text-gray-600", className)}
      {...props}
    >
      {children}
    </p>
  )
}

const VcardInfoSubDescription = ({
  className,
  children,
  ...props
}: VcardInfoTitleProps) => {
  return (
    <p className={cn("text-sm font-medium text-black", className)} {...props}>
      {children}
    </p>
  )
}

// Set displayName for better debugging
VcardInfo.displayName = "VcardInfo"
VcardInfoTitle.displayName = "VcardInfo.Title"
VcardInfoGridWrap.displayName = "VcardInfo.GridWrap"
VcardInfoSubTitle.displayName = "VcardInfo.SubTitle"
VcardInfoSubDescription.displayName = "VcardInfo.SubDescription"

// Attach sub-components to VcardInfo
VcardInfo.Title = VcardInfoTitle
VcardInfo.GridWrap = VcardInfoGridWrap
VcardInfo.SubTitle = VcardInfoSubTitle
VcardInfo.SubDescription = VcardInfoSubDescription
