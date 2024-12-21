ALTER TABLE "qr_virtual_card" ADD COLUMN "work_number" text;--> statement-breakpoint
ALTER TABLE "qr_virtual_card" ADD COLUMN "home_number" text;--> statement-breakpoint
ALTER TABLE "qr_virtual_card" ADD COLUMN "whatsapp_number" text;--> statement-breakpoint
ALTER TABLE "qr_virtual_card" ADD COLUMN "fax_number" text;--> statement-breakpoint
ALTER TABLE "qr_virtual_card" ADD COLUMN "personal_email" text;--> statement-breakpoint
ALTER TABLE "qr_virtual_card" ADD COLUMN "work_email" text;--> statement-breakpoint
ALTER TABLE "qr_virtual_card" ADD COLUMN "company" text;--> statement-breakpoint
ALTER TABLE "qr_virtual_card" ADD COLUMN "additional_information" text;--> statement-breakpoint
ALTER TABLE "qr_virtual_card" DROP COLUMN IF EXISTS "work";--> statement-breakpoint
ALTER TABLE "qr_virtual_card" DROP COLUMN IF EXISTS "home";--> statement-breakpoint
ALTER TABLE "qr_virtual_card" DROP COLUMN IF EXISTS "whatsapp";--> statement-breakpoint
ALTER TABLE "qr_virtual_card" DROP COLUMN IF EXISTS "fax";--> statement-breakpoint
ALTER TABLE "qr_virtual_card" DROP COLUMN IF EXISTS "personal";--> statement-breakpoint
ALTER TABLE "qr_virtual_card" DROP COLUMN IF EXISTS "email_work";--> statement-breakpoint
ALTER TABLE "qr_virtual_card" DROP COLUMN IF EXISTS "organization";--> statement-breakpoint
ALTER TABLE "qr_virtual_card" DROP COLUMN IF EXISTS "info";