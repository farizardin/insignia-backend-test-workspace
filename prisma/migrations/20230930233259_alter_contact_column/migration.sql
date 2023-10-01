/*
  Warnings:

  - You are about to drop the column `number` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "number",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
