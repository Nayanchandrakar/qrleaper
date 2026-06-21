import Image from "next/image"
import Link from "next/link"

import { MaskBackground } from "@/components/mesh/mask-background"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="size-full">
      {/* mask background  */}
      <MaskBackground />
      <div className="relative flex min-h-screen items-center justify-center">
        {/* logo here  */}
        <Link href="/design">
          <Image
            src="/logo.svg"
            alt="logo"
            width={1000}
            height={1000}
            sizes="100vw"
            className="absolute left-4 top-[-30px] z-10 h-fit w-36"
          />
        </Link>
        {children}
        <div className="absolute bottom-2 flex w-full flex-col items-center justify-center gap-2 py-10 pb-6">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} QR Leaper Inc.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
