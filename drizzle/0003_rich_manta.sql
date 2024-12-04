CREATE TABLE IF NOT EXISTS "emailChangeToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "emailChangeToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
