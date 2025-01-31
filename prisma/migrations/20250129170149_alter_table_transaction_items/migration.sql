/*
  Warnings:

  - The primary key for the `transaction_items` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "transaction_items" DROP CONSTRAINT "transaction_items_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "transaction_items_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "transaction_items_id_seq";
