import { hash, verify } from 'argon2'

export async function hashPassword(password: string) {
  return await hash(password)
}

export async function validatePassword({
  password,
  passwordHash,
}: {
  password: string
  passwordHash: string
}) {
  return await verify(passwordHash, password)
}
