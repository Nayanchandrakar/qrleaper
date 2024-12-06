import Link from "next/link"
import Image from "next/image"
import { MaskBackground } from "@/components/mesh/mask-background"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="size-full">
      {/* mask background  */}
      <MaskBackground />
      <div className="flex relative min-h-screen justify-center items-center ">
        {/* logo here  */}
        <Link href="/design">
          <Image
            src="/logo.svg"
            alt="logo"
            width={1000}
            height={1000}
            sizes="100vw"
            className="absolute w-32 h-fit left-4 top-[-20px] z-10"
          />
        </Link>
        {children}
        <div className="absolute flex w-full flex-col items-center justify-center gap-2 py-10 pb-6 bottom-2">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} QR Leaper Inc.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
