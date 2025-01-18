-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_membership_id_fkey";

-- AlterTable
ALTER TABLE "memberships" ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "memberships"("id") ON DELETE CASCADE ON UPDATE CASCADE;
