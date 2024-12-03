"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import type { Session } from "next-auth"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userNavigationLinks } from "@/constants/navigation/navigation-constants"

export const UserButton = ({ session }: { session: Session }) => {
  const user = session?.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.image!} />
          <AvatarFallback className="bg-green-600 text-sm font-semibold uppercase text-white">
            {user?.name?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 w-[14rem]">
        <DropdownMenuLabel>
          <span className="antialiased">
            <p className="text-sm font-semibold first-letter:uppercase">
              {user?.name}
            </p>
            <p className="text-xs font-normal text-zinc-500">{user?.email}</p>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userNavigationLinks?.map(({ id, Icon, href, label }) => (
            <DropdownMenuItem className="cursor-pointer" key={id} asChild>
              <Link href={href}>
                <Icon className="mr-2 size-4" />
                <span>{label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => {
            await signOut({ redirectTo: "/" })
          }}
        >
          <LogOut className="mr-2 size-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
