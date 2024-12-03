import { ProfileNameUpdateForm } from "@/components/forms/user-profile/profile-name-update"
import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"

interface UserProfilePageProps {}

const UserProfilePage = async ({}: UserProfilePageProps) => {
  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  return (
    <section className="p-8">
      <ProfileNameUpdateForm defaultName={session?.user?.name!} />
    </section>
  )
}

export default UserProfilePage
