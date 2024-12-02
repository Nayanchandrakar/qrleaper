import { auth } from "@/lib/auth/auth"

const QrCodePage = async () => {
  const session = await auth()

  return <div>{JSON.stringify(session?.user)}</div>
}

export default QrCodePage
