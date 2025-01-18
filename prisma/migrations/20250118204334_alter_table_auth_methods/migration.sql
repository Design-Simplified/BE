-- DropForeignKey
ALTER TABLE "auth_methods" DROP CONSTRAINT "auth_methods_user_id_fkey";

-- AddForeignKey
ALTER TABLE "auth_methods" ADD CONSTRAINT "auth_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
