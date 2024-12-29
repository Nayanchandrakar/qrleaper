CREATE TYPE "public"."status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('link', 'file', 'message', 'email', 'instagram', 'facebook', 'youtube', 'googleDoc', 'vcard');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_analytics" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"count" integer DEFAULT 1,
	"device_id" text,
	"user_agent" text,
	"ip" text,
	"continent" text,
	"country" text,
	"city" text,
	"region" text,
	"device_type" text,
	"device_vendor" text,
	"device_model" text,
	"browser" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_scan_count" (
	"id" text PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 1,
	"qr_code_id" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"passwordHash" text,
	"emailVerified" timestamp,
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emailChangeToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "emailChangeToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "passwordResetToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "passwordResetToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_code" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"type" "type" NOT NULL,
	"status" "status" DEFAULT 'active',
	"endpoint" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_code_style" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"color" text NOT NULL,
	"logo" text,
	"shape" text NOT NULL,
	"has_frame" boolean NOT NULL,
	"top_text" text,
	"bottom_text" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"count" integer DEFAULT 0,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"stripe_price_id" text,
	"stripe_current_period_end" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "subscription_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "subscription_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "subscription_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_email" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"email" text NOT NULL,
	"subject" text,
	"message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_facebook" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"facebook_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_code_file" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"file_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_google_doc" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"google_doc_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_instagram" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"instagram_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_code_link" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_message" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_virtual_card" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"user_name" text NOT NULL,
	"profile_image" text NOT NULL,
	"images" text[],
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"middle_name" text,
	"prefix" text,
	"suffix" text,
	"mobile_number" text,
	"work_number" text,
	"home_number" text,
	"whatsapp_number" text,
	"fax_number" text,
	"personal_email" text,
	"work_email" text,
	"home_street" text,
	"home_city" text,
	"home_state" text,
	"home_zip" text,
	"home_country" text,
	"work_street" text,
	"work_city" text,
	"work_state" text,
	"work_zip" text,
	"work_country" text,
	"website" text,
	"company" text,
	"job_title" text,
	"department" text,
	"linkedin" text,
	"twitter" text,
	"instagram" text,
	"facebook" text,
	"additional_information" text,
	CONSTRAINT "qr_virtual_card_user_name_unique" UNIQUE("user_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qr_youtube" (
	"id" text PRIMARY KEY NOT NULL,
	"qr_code_id" text NOT NULL,
	"youtube_url" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_analytics" ADD CONSTRAINT "qr_analytics_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_scan_count" ADD CONSTRAINT "qr_scan_count_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_code" ADD CONSTRAINT "qr_code_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_code_style" ADD CONSTRAINT "qr_code_style_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_email" ADD CONSTRAINT "qr_email_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_facebook" ADD CONSTRAINT "qr_facebook_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_code_file" ADD CONSTRAINT "qr_code_file_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_google_doc" ADD CONSTRAINT "qr_google_doc_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_instagram" ADD CONSTRAINT "qr_instagram_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_code_link" ADD CONSTRAINT "qr_code_link_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_message" ADD CONSTRAINT "qr_message_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_virtual_card" ADD CONSTRAINT "qr_virtual_card_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qr_youtube" ADD CONSTRAINT "qr_youtube_qr_code_id_qr_code_id_fk" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_code"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "deviceId_Idx" ON "qr_analytics" USING btree ("device_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qrCode_Idx" ON "qr_analytics" USING btree ("qr_code_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qrCode_unique_Idx" ON "qr_scan_count" USING btree ("qr_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userid_qrcode_idx" ON "qr_code" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_code_style_idx" ON "qr_code_style" USING btree ("qr_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_email_qrcode_idx" ON "qr_email" USING btree ("qr_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_facebook_qrcode_idx" ON "qr_facebook" USING btree ("qr_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_file_qrcode_idx" ON "qr_code_file" USING btree ("qr_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_google_doc_qrcode_idx" ON "qr_google_doc" USING btree ("qr_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_instagram_qrcode_idx" ON "qr_instagram" USING btree ("qr_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_link_qrcode_idx" ON "qr_code_link" USING btree ("qr_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_message_qrcode_idx" ON "qr_message" USING btree ("qr_code_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qr_vcard_unique_idx" ON "qr_virtual_card" USING btree ("user_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_vcard_qrcode_idx" ON "qr_virtual_card" USING btree ("qr_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "qr_youtube_qrcode_idx" ON "qr_youtube" USING btree ("qr_code_id");