import { defineConfig } from "drizzle-kit"
import { config } from "dotenv"

config({
  path: ".env",
})

const url = process.env.NODE_ENV !== "production" ? "postgres://postgres:postgres@db.localtest.me:5432/main" : process.env.DATABASE_URL!

export default defineConfig({
  schema: "./database/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process?.env?.DATABASE_URL! as string,
  },
})
