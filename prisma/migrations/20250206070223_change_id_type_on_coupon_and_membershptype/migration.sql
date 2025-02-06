/*
  Warnings:

  - Added the required column `duration_in_day` to the `membership_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "membership_types" ADD COLUMN     "duration_in_day" INTEGER NOT NULL;
