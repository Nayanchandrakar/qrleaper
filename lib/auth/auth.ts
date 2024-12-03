import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import CredentialsProvider from "next-auth/providers/credentials"

import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/database/db"
import { sendEmail } from "@/lib/mail"
import LoginLink from "@/templates/auth/login-link"
import { eq } from "drizzle-orm"
import { users } from "@/database/schema"
import { validatePassword } from "./password"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
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
            subject: `Your ${process.env.NEXT_PUBLIC_APP_NAME} Login Link`,
            react: LoginLink({ url }),
          })
        }
      },
    }),

    // Handle google authentication here
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    // Handle credential sign in
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("no-credentials")
        }

        const { email, password } = credentials

        if (!email || !password) {
          throw new Error("no-credentials-provided")
        }

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email as string))

        if (!user || !user.passwordHash) {
          throw new Error("invalid-credentials")
        }

        const passwordMatch = await validatePassword({
          password: password as string,
          passwordHash: user.passwordHash,
        })

        if (!passwordMatch) {
          throw new Error("invalid-credentials")
        }

        if (!user.emailVerified) {
          throw new Error("email-not-verified")
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },

  events: {
    async linkAccount({ user }) {
      await db
        ?.update(users)
        .set({
          emailVerified: new Date(),
        })
        .where(eq(users.id, user.id!))
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      const [isExist] = await db
        .select()
        .from(users)
        .where(eq(users.id, user.id!))

      if (
        !isExist ||
        !isExist.emailVerified ||
        !isExist.passwordHash ||
        !isExist.email
      ) {
        return false
      }

      // Remaining for 2FA authentication
      return true
    },
    async jwt({ token }) {
      return token
    },

    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
})
