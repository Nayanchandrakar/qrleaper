CREATE TABLE IF NOT EXISTS "qr_code_file" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"file_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_code_file" ADD CONSTRAINT "qr_code_file_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
