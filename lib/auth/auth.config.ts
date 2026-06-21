import { eq } from "drizzle-orm"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"

import { createSubscription } from "@/app/actions/helpers/subscription/utils"
import { getUserById } from "@/app/actions/utils"
import { db } from "@/database/db"
import { users } from "@/database/schema"
import { sendEmail } from "@/lib/mail"
import LoginLink from "@/templates/auth/login-link"

import { validatePassword } from "./password"

export default {
  providers: [
    // Handle magic link with resend
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_MAIL,
      sendVerificationRequest: ({ identifier, url }) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`Login link: ${url}`)
          return
        } else {
          sendEmail({
            email: identifier,
            subject: `Your QR Leaper Login Link`,
            react: LoginLink({ url })
          })
        }
      }
    }),

    // Handle google authentication here
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true
    }),

    // Handle credential sign in
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null

        const { email, password } = credentials

        if (!email || !password) return null

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email as string))

        if (!user || !user.passwordHash) return null

        const passwordMatch = await validatePassword({
          password: password as string,
          passwordHash: user.passwordHash
        })

        if (!passwordMatch) return null

        if (!user.emailVerified) return null
        return user
      }
    })
  ],
  pages: {
    signOut: "/design",
    signIn: "/login"
  },

  events: {
    async linkAccount({ user }) {
      await db
        ?.update(users)
        .set({
          emailVerified: new Date()
        })
        .where(eq(users.id, user.id!))
    },

    async signIn({ user, isNewUser, account }) {
      // create a subscription for the new user only
      if (user.id && account?.provider === "google" && isNewUser) {
        await createSubscription(user.id!)
      }
    }
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      const isExist = await getUserById(user.id!)

      if (
        !isExist ||
        !isExist.emailVerified ||
        !isExist.passwordHash ||
        !isExist.email
      ) {
        return false
      }

      return true
    },

    async jwt({ token, trigger }) {
      // fetch updated user from the database
      if (trigger === undefined || trigger === "update") {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.id, token?.sub))

        if (user) {
          token.name = user.name as string
          token.email = user.email as string
        }
      }

      return token
    },

    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub as string
      }
      return session
    }
  }
} satisfies NextAuthConfig
