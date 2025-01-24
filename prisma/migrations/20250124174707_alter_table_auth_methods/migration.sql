-- AlterTable
ALTER TABLE "auth_methods" ALTER COLUMN "provider_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "niches" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "niches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_niches" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "niche_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_niches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sub_niches" ADD CONSTRAINT "sub_niches_niche_id_fkey" FOREIGN KEY ("niche_id") REFERENCES "niches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
