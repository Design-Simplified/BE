/*
  Warnings:

  - You are about to drop the column `email_verification_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_verification_token",
DROP COLUMN "is_verified",
DROP COLUMN "password",
ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "roleId" DROP DEFAULT;
