ALTER TABLE "transactions" ADD COLUMN "date" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "date";