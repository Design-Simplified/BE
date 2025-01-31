/*
  Warnings:

  - Added the required column `price` to the `membership_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "membership_types" ADD COLUMN     "price" INTEGER NOT NULL;
