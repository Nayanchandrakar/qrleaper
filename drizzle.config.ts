import { defineConfig } from "drizzle-kit"
import { config } from "dotenv"

config({
  path: ".env",
})

export default defineConfig({
  schema: "./database/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process?.env?.DATABASE_URL! as string,
  },
})
