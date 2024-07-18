/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guest` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Guest_email_key` ON `Guest`(`email`);
