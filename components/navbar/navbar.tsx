"use client"

import { usePathname } from "next/navigation"

import { authRoutes } from "@/routes"
import { Container } from "@/components/global/container"
import { NavbarLogo } from "@/components/navbar/logo"
import { SessionType } from "@/types/type"
import { NavigationMenu } from "@/components/navbar/navigation-menu"

interface NavbarProps {
  session: SessionType
}

const Navbar = ({ session }: NavbarProps) => {
  const pathname = usePathname()
  const isAuthRoute = authRoutes?.includes(pathname)
  const isRedirectRoute = pathname?.startsWith("/link")
  const isForgotPasswordPath = pathname.startsWith("/forgot-password")

  if (isAuthRoute || isRedirectRoute || isForgotPasswordPath) {
    return null
  }

  return (
    <header className="sticky overflow-hidden top-0 z-[60] h-[62px] w-full border-b border-b-zinc-300 bg-white ">
      <Container className="flex size-full items-center justify-between">
        <NavbarLogo />
        <NavigationMenu session={session} />
      </Container>
    </header>
  )
}

export { Navbar }
