import { Loader } from "lucide-react"

import { getFilePath } from "@/utils/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileAvatarProps {
  lastName: string
  firstName: string
  profileImage: string
  prefix: string | null
  suffix: string | null
  middleName: string | null
  department: string | null
}

export const ProfileAvatar = ({
  firstName,
  lastName,
  department,
  middleName,
  prefix,
  suffix,
  profileImage,
}: ProfileAvatarProps) => {
  return (
    <>
      <Avatar className="size-24">
        <AvatarImage src={getFilePath(profileImage)} />
        <AvatarFallback>
          <Loader className="size-5 animate-spin" />
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center justify-center flex-col gap-2">
        <h3 className="font-semibold text-green-600 text-xl text-center">
          {prefix} {firstName} {middleName} {lastName}
          <br />
          {suffix}
        </h3>
        <p className="font-medium text-sm text-green-700">{department}</p>
      </div>
    </>
  )
}
