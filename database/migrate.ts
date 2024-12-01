import { migrate } from "drizzle-orm/neon-serverless/migrator"
import { db } from "./db"

export async function runMigrate() {
  try {
    console.log("⏳ Running migrations...")
    const start = Date.now()

    await migrate(db, { migrationsFolder: "drizzle" })

    const end = Date.now()
    console.log(`✅ Migrations completed in ${end - start}ms`)
  } catch (error) {
    console.error("❌ Migration failed")
  }
}
