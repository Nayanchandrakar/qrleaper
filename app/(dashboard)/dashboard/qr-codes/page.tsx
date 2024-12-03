import { auth } from "@/lib/auth/auth"

const QrCodePage = async () => {
  const session = await auth()

  return <div>{session?.user?.email}</div>
}

export default QrCodePage
