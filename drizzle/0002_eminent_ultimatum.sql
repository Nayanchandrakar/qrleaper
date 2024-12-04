ALTER TABLE "user" ADD COLUMN "passwordHash" text;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "password";