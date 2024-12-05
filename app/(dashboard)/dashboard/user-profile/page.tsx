import { redirect } from "next/navigation"

import { getUserWithAccountByUserId } from "@/app/actions/utils"
import { ProfileNameUpdateForm } from "@/components/forms/user-profile/profile-name-update"
import { auth } from "@/lib/auth/auth"
import { RequestSetPassword } from "@/components/forms/user-profile/request-set-password"
import { UpdatePasswordForm } from "@/components/forms/user-profile/update-password-form"
import { EmailChangeComponent } from "@/components/pages/auth/email-change/email-change-component"
import { Container } from "@/components/global/container"

interface UserProfilePageProps {}

const UserProfilePage = async ({}: UserProfilePageProps) => {
  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const userWithAccounData = await getUserWithAccountByUserId(session?.user?.id)

  return (
    <Container className="space-y-12 py-8">
      <ProfileNameUpdateForm defaultName={session?.user?.name!} />

      {!!(
        userWithAccounData?.provider === null &&
        userWithAccounData?.passwordHash
      ) && <EmailChangeComponent />}

      {userWithAccounData?.passwordHash ? (
        <UpdatePasswordForm />
      ) : (
        <RequestSetPassword
          provider={userWithAccounData?.provider!}
          session={session}
        />
      )}
    </Container>
  )
}

export default UserProfilePage
