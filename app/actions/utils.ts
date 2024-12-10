import { and, eq, gte } from "drizzle-orm"

import { db } from "@/database/db"
import {
  users,
  accounts,
  passwordResetToken,
  qrCode,
  qrCodeStyle,
} from "@/database/schema"
import {
  qrEmail,
  qrFacebook,
  qrInstagram,
  qrLink,
  qrMessage,
} from "@/database/schema/qr-variations"
import type { qrType } from "@/types/db-types"

export const getUserById = async (id: string) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user
  } catch {
    return null
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email))
    return user
  } catch {
    return null
  }
}

export const getUserWithAccountByUserId = async (id: string) => {
  try {
    const [userAccount] = await db
      .select({
        id: users.id,
        provider: accounts.provider,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .leftJoin(accounts, eq(accounts.userId, id))

    return userAccount
  } catch {
    return null
  }
}

export const isValidToken = async (token: string) => {
  try {
    const [userToken] = await db
      .select({
        token: passwordResetToken.token,
      })
      .from(passwordResetToken)
      .where(
        and(
          eq(passwordResetToken.token, token),
          gte(passwordResetToken.expires, new Date())
        )
      )

    return userToken.token as string
  } catch {
    return null
  }
}

export const getQrCodeByUserIdAndIdWithType = async (
  userId: string,
  qrId: string,
  type: qrType
) => {
  try {
    const [data] = await db
      .select()
      .from(qrCode)
      .where(
        and(
          eq(qrCode.id, qrId),
          eq(qrCode.userId, userId!),
          eq(qrCode.type, type),
          eq(qrCode.status, "active")
        )
      )

    return data
  } catch (error) {
    return null
  }
}

export const getLinkQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const data = await db.transaction(async (tx) => {
      const [[style], [link]] = await Promise.all([
        tx.select().from(qrCodeStyle).where(eq(qrCodeStyle.qrCodeId, id)),
        tx.select().from(qrLink).where(eq(qrLink.qrCodeId, id)),
      ])
      return {
        style,
        link,
      }
    })
    return data
  } catch {
    return null
  }
}

export const getMessageQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const data = await db.transaction(async (tx) => {
      const [[style], [message]] = await Promise.all([
        tx.select().from(qrCodeStyle).where(eq(qrCodeStyle.qrCodeId, id)),
        tx.select().from(qrMessage).where(eq(qrMessage.qrCodeId, id)),
      ])
      return {
        style,
        message,
      }
    })
    return data
  } catch {
    return null
  }
}

export const getEmailQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const data = await db.transaction(async (tx) => {
      const [[style], [email]] = await Promise.all([
        tx.select().from(qrCodeStyle).where(eq(qrCodeStyle.qrCodeId, id)),
        tx.select().from(qrEmail).where(eq(qrEmail.qrCodeId, id)),
      ])
      return {
        style,
        email,
      }
    })
    return data
  } catch {
    return null
  }
}

export const getInstagramQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const data = await db.transaction(async (tx) => {
      const [[style], [instagram]] = await Promise.all([
        tx.select().from(qrCodeStyle).where(eq(qrCodeStyle.qrCodeId, id)),
        tx.select().from(qrInstagram).where(eq(qrInstagram.qrCodeId, id)),
      ])
      return {
        style,
        instagram,
      }
    })
    return data
  } catch {
    return null
  }
}

export const getFacebookQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const data = await db.transaction(async (tx) => {
      const [[style], [facebook]] = await Promise.all([
        tx.select().from(qrCodeStyle).where(eq(qrCodeStyle.qrCodeId, id)),
        tx.select().from(qrFacebook).where(eq(qrFacebook.qrCodeId, id)),
      ])
      return {
        style,
        facebook,
      }
    })
    return data
  } catch {
    return null
  }
}
