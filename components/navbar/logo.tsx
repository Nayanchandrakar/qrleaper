import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"

export const NavbarLogo = ({ className }: { className?: string }) => {
  return (
    <Link className={cn(className)} href="/design">
      <Image
        width={1000}
        height={1000}
        sizes="100vw"
        alt="navbar-logo"
        src="/logo.svg"
        className="size-28"
      />
    </Link>
  )
}
