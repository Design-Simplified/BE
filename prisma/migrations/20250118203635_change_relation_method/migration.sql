/*
  Warnings:

  - You are about to drop the column `coupon_wallet_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `membership_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `coupon_wallets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `memberships` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `coupon_wallets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `memberships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_coupon_wallet_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_membership_id_fkey";

-- DropIndex
DROP INDEX "users_coupon_wallet_id_key";

-- DropIndex
DROP INDEX "users_membership_id_key";

-- AlterTable
ALTER TABLE "coupon_wallets" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "memberships" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "coupon_wallet_id",
DROP COLUMN "membership_id";

-- CreateIndex
CREATE UNIQUE INDEX "coupon_wallets_user_id_key" ON "coupon_wallets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_user_id_key" ON "memberships"("user_id");

-- AddForeignKey
ALTER TABLE "coupon_wallets" ADD CONSTRAINT "coupon_wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
