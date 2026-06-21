import { isValidToken } from "@/app/actions/utils"
import { ResetPasswordForm } from "@/components/forms/auth/reset-password/reset-password-form"
import { NullComponent } from "@/components/pages/auth/null-page/null-component"

interface ResetPasswordPageProps {
  params: {
    token: string
  }
}

export const metadata = {
  title: "Your Password Reset for QR Leaper"
}

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {
  if (!params?.token) return null

  const token = await isValidToken(params.token)

  if (!token) {
    return (
      <NullComponent
        title="Invalid Reset Token"
        description="The password reset token is invalid or expired. Please request a new one."
      />
    )
  }

  return <ResetPasswordForm token={token} />
}

export default ResetPasswordPage
