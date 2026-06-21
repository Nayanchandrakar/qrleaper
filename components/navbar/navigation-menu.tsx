"use client"

import Link from "next/link"

import { LinkButton } from "@/components/buttons/link-button"
import { MiniButton } from "@/components/buttons/mini-button"
import { MobileHamburgerMenu } from "@/components/navbar/mobile-hamburger-menu"
import { UserButton } from "@/components/navbar/user-button"
import type { SessionType } from "@/types/type"

interface NavigationMenuProps {
  session: SessionType
}

const NavigationMenu = ({ session }: NavigationMenuProps) => {
  const isAuthenticated = !!session?.user?.id

  return (
    <div className="flex items-center gap-3">
      <LinkButton href="/design" className="hidden sm:inline-block">
        QR Code Generator
      </LinkButton>

      <LinkButton href="/solutions" className="hidden sm:inline-block">
        Solutions
      </LinkButton>

      <LinkButton href="/pricing" className="hidden sm:inline-block">
        Pricing
      </LinkButton>

      {isAuthenticated ? (
        <>
          <LinkButton
            className="hidden sm:inline-block"
            href="/dashboard/qr-codes"
          >
            Dashboard
          </LinkButton>
          <UserButton session={session!} />
        </>
      ) : (
        <>
          <LinkButton className="hidden sm:inline-block" href="/login">
            Login
          </LinkButton>

          <Link className="hidden sm:inline-block" href="/register">
            <MiniButton>Sign Up</MiniButton>
          </Link>

          <Link className="inline-block sm:hidden" href="/login">
            <MiniButton>Login</MiniButton>
          </Link>

          <MobileHamburgerMenu />
        </>
      )}
    </div>
  )
}

export { NavigationMenu }
