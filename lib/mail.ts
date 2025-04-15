import { Resend } from "resend"

const resend = new Resend(process?.env?.RESEND_API_KEY)

export const sendEmail = async ({
  subject,
  email,
  react,
}: {
  subject: string
  email: string
  // biome-ignore lint/suspicious/noExplicitAny:
  react: any
}) => {
  try {
    const { error } = await resend?.emails?.send({
      from: process.env.RESEND_MAIL!,
      to: email,
      subject,
      react,
    })

    if (error) {
      console.error("Email sending error:", error)
    }
  } catch (error) {
    console.error("Unexpected error:", error)
  }
}
