/*
  Warnings:

  - The primary key for the `coupon_wallets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_coupon_id_fkey";

-- AlterTable
ALTER TABLE "coupon_wallets" DROP CONSTRAINT "coupon_wallets_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "coupon_wallets_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "coupon_wallets_id_seq";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "coupon_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupon_wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
