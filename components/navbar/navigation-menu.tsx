"use client"

import Link from "next/link"

import { MiniButton } from "@/components/buttons/mini-button"
import { LinkButton } from "@/components/buttons/link-button"
import { UserButton } from "@/components/navbar/user-button"
import { SessionType } from "@/types/type"

interface NavigationMenuProps {
  session: SessionType
}

const NavigationMenu = ({ session }: NavigationMenuProps) => {
  const isAuthenticated = !!session?.user?.id

  return (
    <div className="flex items-center gap-4">
      <LinkButton href="/pricing">Pricing</LinkButton>
      {isAuthenticated ? (
        <UserButton session={session!} />
      ) : (
        <>
          <LinkButton href="/login">Login</LinkButton>

          <Link href="/register">
            <MiniButton>Sign Up</MiniButton>
          </Link>
        </>
      )}
    </div>
  )
}

export { NavigationMenu }
