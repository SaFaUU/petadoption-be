/*
  Warnings:

  - The `species` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Species" AS ENUM ('DOG', 'CAT');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "species",
ADD COLUMN     "species" "Species",
ALTER COLUMN "healthStatus" DROP DEFAULT,
ALTER COLUMN "size" DROP DEFAULT;
