"use client"

import { usePathname } from "next/navigation"

import { Container } from "@/components/global/container"
import { NavbarLogo } from "@/components/navbar/logo"
import { NavigationMenu } from "@/components/navbar/navigation-menu"
import { authRoutes } from "@/routes"
import type { SessionType } from "@/types/type"

interface NavbarProps {
  session: SessionType
}

const Navbar = ({ session }: NavbarProps) => {
  const pathname = usePathname()
  const isAuthRoute = authRoutes?.includes(pathname)
  const isRedirectRoute = pathname?.startsWith("/link")
  const isForgotPasswordPath = pathname.startsWith("/forgot-password")
  const isResetPasswordPath = pathname.startsWith("/reset-password")

  if (
    isAuthRoute ||
    isRedirectRoute ||
    isForgotPasswordPath ||
    isResetPasswordPath
  ) {
    return null
  }

  return (
    <header className="bg-gradient-brand sticky top-0 z-[60] h-[62px] w-full overflow-hidden">
      <Container className="flex size-full items-center justify-between">
        <NavbarLogo />
        <NavigationMenu session={session} />
      </Container>
    </header>
  )
}

export { Navbar }
