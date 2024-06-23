/*
  Warnings:

  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('EXCELLENT', 'VERY_GOOD', 'GOOD', 'FAIR', 'POOR');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "healthStatus" "HealthStatus" NOT NULL DEFAULT 'EXCELLENT',
ADD COLUMN     "imageUrl" TEXT;
