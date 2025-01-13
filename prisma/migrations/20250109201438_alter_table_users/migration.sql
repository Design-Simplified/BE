-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_verification_token" TEXT;

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");
