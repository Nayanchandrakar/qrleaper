import { and, eq, gte } from "drizzle-orm"

import { db } from "@/database/db"
import {
  accounts,
  passwordResetToken,
  qrAnalytics,
  qrCode,
  qrCodeStyle,
  qrScanCount,
  subscription,
  users
} from "@/database/schema"
import {
  qrEmail,
  qrFacebook,
  qrFile,
  qrGoogleDoc,
  qrInstagram,
  qrLink,
  qrMessage,
  qrVirtualCard,
  qrYoutube
} from "@/database/schema/qr-variations"
import { increment } from "@/database/utils"
import type { qrCodeType, qrType } from "@/types/db-types"

export const getQrCodeByUserIdAndStatusType = async (
  userId: string,
  qrId: string,
  status: qrCodeType["status"]
) => {
  try {
    const [data] = await db
      .select()
      .from(qrCode)
      .where(
        and(
          eq(qrCode.userId, userId),
          eq(qrCode.id, qrId),
          eq(qrCode.status, status!)
        )
      )
      .limit(1)
    return data
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
    return user
  } catch {
    return null
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
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
        passwordHash: users.passwordHash
      })
      .from(users)
      .leftJoin(accounts, eq(accounts.userId, id))
      .limit(1)

    return userAccount
  } catch {
    return null
  }
}

export const isValidToken = async (token: string) => {
  try {
    const [userToken] = await db
      .select({
        token: passwordResetToken.token
      })
      .from(passwordResetToken)
      .where(
        and(
          eq(passwordResetToken.token, token),
          gte(passwordResetToken.expires, new Date())
        )
      )
      .limit(1)

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
      .limit(1)

    return data
  } catch {
    return null
  }
}

export const getLinkQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const [[style], [link]] = await Promise.all([
      db
        .select()
        .from(qrCodeStyle)
        .where(eq(qrCodeStyle.qrCodeId, id))
        .limit(1),
      db.select().from(qrLink).where(eq(qrLink.qrCodeId, id)).limit(1)
    ])

    return {
      style,
      link
    }
  } catch {
    return null
  }
}

export const getMessageQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const [[style], [message]] = await Promise.all([
      db
        .select()
        .from(qrCodeStyle)
        .where(eq(qrCodeStyle.qrCodeId, id))
        .limit(1),
      db.select().from(qrMessage).where(eq(qrMessage.qrCodeId, id)).limit(1)
    ])

    return { style, message }
  } catch {
    return null
  }
}

export const getEmailQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const [[style], [email]] = await Promise.all([
      db
        .select()
        .from(qrCodeStyle)
        .where(eq(qrCodeStyle.qrCodeId, id))
        .limit(1),
      db.select().from(qrEmail).where(eq(qrEmail.qrCodeId, id)).limit(1)
    ])

    return { style, email }
  } catch {
    return null
  }
}

export const getInstagramQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const [[style], [instagram]] = await Promise.all([
      db
        .select()
        .from(qrCodeStyle)
        .where(eq(qrCodeStyle.qrCodeId, id))
        .limit(1),
      db.select().from(qrInstagram).where(eq(qrInstagram.qrCodeId, id)).limit(1)
    ])
    return { style, instagram }
  } catch {
    return null
  }
}

export const getFacebookQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const [[style], [facebook]] = await Promise.all([
      db
        .select()
        .from(qrCodeStyle)
        .where(eq(qrCodeStyle.qrCodeId, id))
        .limit(1),
      db.select().from(qrFacebook).where(eq(qrFacebook.qrCodeId, id)).limit(1)
    ])

    return {
      style,
      facebook
    }
  } catch {
    return null
  }
}

export const getYoutubeQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const [[style], [youtube]] = await Promise.all([
      db
        .select()
        .from(qrCodeStyle)
        .where(eq(qrCodeStyle.qrCodeId, id))
        .limit(1),
      db.select().from(qrYoutube).where(eq(qrYoutube.qrCodeId, id)).limit(1)
    ])

    return {
      style,
      youtube
    }
  } catch {
    return null
  }
}

export const getGoogleDocsQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const [[style], [googleDocs]] = await Promise.all([
      db
        .select()
        .from(qrCodeStyle)
        .where(eq(qrCodeStyle.qrCodeId, id))
        .limit(1),
      db.select().from(qrGoogleDoc).where(eq(qrGoogleDoc.qrCodeId, id)).limit(1)
    ])
    return {
      style,
      googleDocs
    }
  } catch {
    return null
  }
}

export const getFileQrStyleAndDataByQrCodeId = async (id: string) => {
  try {
    const [[style], [file]] = await Promise.all([
      db
        .select()
        .from(qrCodeStyle)
        .where(eq(qrCodeStyle.qrCodeId, id))
        .limit(1),
      db.select().from(qrFile).where(eq(qrFile.qrCodeId, id)).limit(1)
    ])
    return {
      style,
      file
    }
  } catch {
    return null
  }
}

export const getVcardQrStyleAndDataByQrCodeId = async (id: string) => {
  const [[style], [vcard]] = await Promise.all([
    db.select().from(qrCodeStyle).where(eq(qrCodeStyle.qrCodeId, id)).limit(1),
    db
      .select()
      .from(qrVirtualCard)
      .where(eq(qrVirtualCard.qrCodeId, id))
      .limit(1)
  ])
  return {
    style,
    vcard
  }
}

export const getQrScanCountById = async (id: string) => {
  try {
    const [data] = await db
      .select()
      .from(qrScanCount)
      .where(eq(qrScanCount.qrCodeId, id))
      .limit(1)
    return data
  } catch {
    return null
  }
}

export const getSubscriptionByUserId = async (userId: string) => {
  try {
    const [data] = await db
      ?.select()
      .from(subscription)
      .where(eq(subscription.userId, userId))
      .limit(1)
    return data
  } catch {
    return null
  }
}

export const getQrCodeById = async (id: string) => {
  try {
    const [data] = await db
      .select()
      .from(qrCode)
      .where(eq(qrCode.id, id))
      .limit(1)
    return data
  } catch {
    return null
  }
}

export const getQrAnalyticsByQrCodeIdAndDeviceId = async (
  qrId: string,
  deviceId: string
) => {
  try {
    const [data] = await db
      .select({ id: qrAnalytics.id })
      .from(qrAnalytics)
      .where(
        and(eq(qrAnalytics.qrCodeId, qrId), eq(qrAnalytics.deviceId, deviceId))
      )
      .limit(1)

    return data
  } catch {
    return null
  }
}

export const incrementQrAnalyticsCountById = async (id: string) => {
  try {
    await db
      .update(qrAnalytics)
      .set({
        count: increment(qrAnalytics.count, 1)
      })
      .where(eq(qrAnalytics.id, id))
  } catch {
    return null
  }
}

export const incrmentQrScanCountByQrCodeId = async (qrCodeId: string) => {
  try {
    await db
      .insert(qrScanCount)
      .values({
        qrCodeId
      })
      .onConflictDoUpdate({
        target: qrScanCount.qrCodeId,
        set: {
          count: increment(qrScanCount.count, 1)
        }
      })
  } catch {
    return null
  }
}

export const getQrCodeWithStyleByUserIdAndId = async (
  userId: string,
  id: string
) => {
  try {
    const [data] = await db
      .select()
      .from(qrCode)
      .innerJoin(qrCodeStyle, eq(qrCode.id, qrCodeStyle.qrCodeId))
      .where(and(eq(qrCode.userId, userId), eq(qrCode.id, id)))
      .limit(1)
    return data
  } catch {
    return null
  }
}

export const getQrFileByQrCodeId = async (id: string) => {
  try {
    const [data] = await db
      .select()
      .from(qrFile)
      .where(eq(qrFile.qrCodeId, id))
      .limit(1)
    return data
  } catch {
    return null
  }
}

export const updateQrCodeStylelogoById = async (id: string, logo: string) => {
  try {
    await db
      .update(qrCodeStyle)
      .set({
        logo
      })
      .where(eq(qrCodeStyle.id, id))
  } catch {
    return null
  }
}

export const getVCardQrCodeByqrCodeId = async (id: string) => {
  try {
    const [vCardData] = await db
      .select()
      .from(qrVirtualCard)
      .where(eq(qrVirtualCard.qrCodeId, id))
      .limit(1)
    return vCardData
  } catch {
    return null
  }
}

export const getVcardWithProfileImageAndImageByQrCodeId = async (
  qrCodeId: string
) => {
  const [vCardFile] = await db
    .select({
      profileImage: qrVirtualCard.profileImage,
      images: qrVirtualCard.images
    })
    .from(qrVirtualCard)
    .where(eq(qrVirtualCard.qrCodeId, qrCodeId))
    .limit(1)

  return vCardFile
}

export const isUserNameAvailable = async (userName: string) => {
  const [result] = await db
    .select({ userName: qrVirtualCard.userName })
    .from(qrVirtualCard)
    .where(eq(qrVirtualCard.userName, userName))
    .limit(1)

  return result?.userName
}

export const getVCardByUserName = async (userName: string) => {
  try {
    const [result] = await db
      .select({
        qrCodeId: qrVirtualCard.qrCodeId
      })
      .from(qrVirtualCard)
      .where(eq(qrVirtualCard.userName, userName))
      .limit(1)

    return result
  } catch {
    return null
  }
}

export const getVCardUserNameByQrCodeId = async (id: string) => {
  try {
    const [result] = await db
      .select({
        userName: qrVirtualCard.userName
      })
      .from(qrVirtualCard)
      .where(eq(qrVirtualCard.qrCodeId, id))
      .limit(1)

    return result?.userName ?? ""
  } catch {
    return null
  }
}

export const getVCardFileDataByQrCodeId = async (id: string) => {
  try {
    const [result] = await db
      .select({
        images: qrVirtualCard.images,
        profileImage: qrVirtualCard.profileImage
      })
      .from(qrVirtualCard)
      .where(eq(qrVirtualCard.qrCodeId, id))
      .limit(1)

    return result
  } catch {
    return null
  }
}
