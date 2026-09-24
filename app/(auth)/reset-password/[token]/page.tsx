import { isValidToken } from "@/app/actions/utils"
import { ResetPasswordForm } from "@/components/forms/auth/reset-password/reset-password-form"
import { NullComponent } from "@/components/pages/auth/null-page/null-component"

interface ResetPasswordPageProps {
  params: Promise<{
    token: string
  }>
}

export const metadata = {
  title: "Your Password Reset for QR Leaper"
}

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {
  const { token } = await params

  if (!token) return null

  const validToken = await isValidToken(token)

  if (!validToken) {
    return (
      <NullComponent
        title="Invalid Reset Token"
        description="The password reset token is invalid or expired. Please request a new one."
      />
    )
  }

  return <ResetPasswordForm token={validToken} />
}

export default ResetPasswordPage
