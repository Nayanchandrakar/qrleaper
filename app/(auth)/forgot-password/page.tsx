import { ForgotPasswordForm } from "@/components/forms/auth/forgot-password/forgot-password-form"

interface ForgotPasswordPageProps {}

export const metadata = {
  title: "Forgot Password for your QR Leaper account",
}

const ForgotPasswordPage = ({}: ForgotPasswordPageProps) => {
  return <ForgotPasswordForm />
}

export default ForgotPasswordPage
