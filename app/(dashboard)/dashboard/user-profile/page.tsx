import { redirect } from "next/navigation"

import { getUserAccountById } from "@/app/actions/utils"
import { ProfileNameUpdateForm } from "@/components/forms/user-profile/profile-name-update"
import { auth } from "@/lib/auth/auth"
import { RequestSetPassword } from "@/components/forms/user-profile/request-set-password"

interface UserProfilePageProps {}

const UserProfilePage = async ({}: UserProfilePageProps) => {
  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const accountData = await getUserAccountById(session?.user?.id)

  return (
    <section className="p-8 space-y-12">
      <ProfileNameUpdateForm defaultName={session?.user?.name!} />
      <RequestSetPassword provider={accountData?.provider!} session={session} />
    </section>
  )
}

export default UserProfilePage
