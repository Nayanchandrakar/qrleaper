import Link from "next/link"
import Image from "next/image"
import MaskBackground from "@/components/layouts/mask-background"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="size-full">
      {/* mask background  */}
      <MaskBackground />
      <div className="flex relative min-h-screen justify-center items-center">
        {/* logo here  */}
        <Link href="/">
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
      </div>
    </div>
  )
}

export default AuthLayout
