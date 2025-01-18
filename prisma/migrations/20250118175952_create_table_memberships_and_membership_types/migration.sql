/*
  Warnings:

  - A unique constraint covering the columns `[membership_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `membership_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_email_idx";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "membership_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "memberships" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "membership_type_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membership_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_membership_id_key" ON "users"("membership_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "memberships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_membership_type_id_fkey" FOREIGN KEY ("membership_type_id") REFERENCES "membership_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
