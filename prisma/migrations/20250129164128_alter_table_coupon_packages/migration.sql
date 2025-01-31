/*
  Warnings:

  - You are about to drop the column `amount` on the `coupon_packages` table. All the data in the column will be lost.
  - Added the required column `total_coupons` to the `coupon_packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon_packages" DROP COLUMN "amount",
ADD COLUMN     "total_coupons" INTEGER NOT NULL;
