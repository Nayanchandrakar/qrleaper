CREATE TABLE IF NOT EXISTS "qr_virtual_card" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"profile_image" text NOT NULL,
	"images" text[],
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"middle_name" text,
	"prefix" text,
	"suffix" text,
	"mobile_number" text,
	"work" text,
	"home" text,
	"whatsapp" text,
	"fax" text,
	"personal" text,
	"email_work" text,
	"home_street" text,
	"home_city" text,
	"home_state" text,
	"home_zip" integer,
	"home_country" text,
	"work_street" text,
	"work_city" text,
	"work_state" text,
	"work_zip" integer,
	"work_country" text,
	"website" text,
	"organization" text,
	"job_title" text,
	"department" text,
	"linkedin" text,
	"twitter" text,
	"instagram" text,
	"facebook" text,
	"info" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_virtual_card" ADD CONSTRAINT "qr_virtual_card_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
