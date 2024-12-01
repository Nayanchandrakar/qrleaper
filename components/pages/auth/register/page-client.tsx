"use client"

import RegisterForm from "@/components/forms/auth/regsiter/register-form"
import { useRegisterContext } from "@/hooks/auth/useRegisterContext"

interface RegisterPageClientProps {}

const RegisterPageClient = ({}: RegisterPageClientProps) => {
  const { step } = useRegisterContext((state) => ({
    step: state.step,
  }))

  if (step === "register") return <RegisterForm />
  if (step === "verify") return "<Verify />"
}

export default RegisterPageClient
