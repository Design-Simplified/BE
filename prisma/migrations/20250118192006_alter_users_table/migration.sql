/*
  Warnings:

  - You are about to drop the column `coupon_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[coupon_wallet_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coupon_wallet_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_coupon_id_fkey";

-- DropIndex
DROP INDEX "users_coupon_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "coupon_id",
ADD COLUMN     "coupon_wallet_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_coupon_wallet_id_key" ON "users"("coupon_wallet_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_coupon_wallet_id_fkey" FOREIGN KEY ("coupon_wallet_id") REFERENCES "coupon_wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
