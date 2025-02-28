CREATE TYPE "public"."gradient_type" AS ENUM('linear', 'radial');--> statement-breakpoint
ALTER TABLE "qr_code_style" ADD COLUMN "colors" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "qr_code_style" ADD COLUMN "rotation" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "qr_code_style" ADD COLUMN "gradient_type" "gradient_type" DEFAULT 'linear' NOT NULL;--> statement-breakpoint
ALTER TABLE "qr_code_style" DROP COLUMN IF EXISTS "color";