import { Container } from "@/components/global/container"
import { ProfileEditCardSkeleton } from "@/components/skeletons/pages/user-profile/profile-edit-card"

const UserProfileLoadingPage = () => {
  return (
    <Container className="space-y-12 py-8">
      <ProfileEditCardSkeleton />
      <ProfileEditCardSkeleton />
      <ProfileEditCardSkeleton />
    </Container>
  )
}

export default UserProfileLoadingPage
