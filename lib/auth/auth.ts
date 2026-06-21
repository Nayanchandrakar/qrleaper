import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"

import { db } from "@/database/db"

import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt"
  },
  // To prevent running code on the next js edge runtime
  ...authConfig
})
