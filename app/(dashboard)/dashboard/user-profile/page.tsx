import { redirect } from "next/navigation"

import { getUserWithAccountByUserId } from "@/app/actions/utils"
import { ProfileNameUpdateForm } from "@/components/forms/user-profile/profile-name-update"
import { auth } from "@/lib/auth/auth"
import { RequestSetPassword } from "@/components/forms/user-profile/request-set-password"
import { UpdatePasswordForm } from "@/components/forms/user-profile/update-password-form"

interface UserProfilePageProps {}

const UserProfilePage = async ({}: UserProfilePageProps) => {
  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const userWithAccounData = await getUserWithAccountByUserId(session?.user?.id)

  return (
    <section className="p-8 space-y-12">
      <ProfileNameUpdateForm defaultName={session?.user?.name!} />

      {userWithAccounData?.passwordHash ? (
        <UpdatePasswordForm />
      ) : (
        <RequestSetPassword
          provider={userWithAccounData?.provider!}
          session={session}
        />
      )}
    </section>
  )
}

export default UserProfilePage
