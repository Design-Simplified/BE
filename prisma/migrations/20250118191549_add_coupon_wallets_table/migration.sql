/*
  Warnings:

  - A unique constraint covering the columns `[coupon_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coupon_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "coupon_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "coupon_wallets" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupon_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_coupon_id_key" ON "users"("coupon_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupon_wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
