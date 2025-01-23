import { getObjectFileSrc } from "@/utils/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface ProfileAvatarProps {
  lastName: string
  firstName: string
  profileImage: string
  prefix: string | null
  suffix: string | null
  middleName: string | null
  jobTitle: string | null
  isPreviewMode: boolean
}

export const ProfileAvatar = ({
  firstName,
  lastName,
  jobTitle,
  middleName,
  prefix,
  suffix,
  profileImage,
  isPreviewMode,
}: ProfileAvatarProps) => {
  return (
    <>
      <Avatar className="size-24">
        <AvatarImage
          className="object-cover"
          src={
            isPreviewMode && profileImage === undefined
              ? "/global/profile-pic.jpg"
              : getObjectFileSrc(isPreviewMode, profileImage)!
          }
        />
        <AvatarFallback>
          <Skeleton className="size-full" />
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center justify-center flex-col gap-2">
        <h3 className="font-bold text-green-600 text-lg sm:text-xl text-center">
          {prefix} {firstName} {middleName} {lastName}
          <br />
          {suffix}
        </h3>
        <p className="font-medium text-sm text-green-700">{jobTitle}</p>
      </div>
    </>
  )
}
