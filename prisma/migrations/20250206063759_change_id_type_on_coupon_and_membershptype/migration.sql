/*
  Warnings:

  - The primary key for the `coupon_packages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `membership_types` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_membership_type_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_items" DROP CONSTRAINT "transaction_items_coupon_package_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_items" DROP CONSTRAINT "transaction_items_membership_type_id_fkey";

-- AlterTable
ALTER TABLE "coupon_packages" DROP CONSTRAINT "coupon_packages_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "coupon_packages_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "coupon_packages_id_seq";

-- AlterTable
ALTER TABLE "membership_types" DROP CONSTRAINT "membership_types_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "membership_types_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "membership_types_id_seq";

-- AlterTable
ALTER TABLE "memberships" ALTER COLUMN "membership_type_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "transaction_items" ALTER COLUMN "coupon_package_id" SET DATA TYPE TEXT,
ALTER COLUMN "membership_type_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_membership_type_id_fkey" FOREIGN KEY ("membership_type_id") REFERENCES "membership_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_items" ADD CONSTRAINT "transaction_items_coupon_package_id_fkey" FOREIGN KEY ("coupon_package_id") REFERENCES "coupon_packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_items" ADD CONSTRAINT "transaction_items_membership_type_id_fkey" FOREIGN KEY ("membership_type_id") REFERENCES "membership_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
