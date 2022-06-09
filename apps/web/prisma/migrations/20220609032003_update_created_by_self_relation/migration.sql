/*
  Warnings:

  - You are about to drop the column `createdById` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "createdById",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
