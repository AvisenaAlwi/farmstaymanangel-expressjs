/*
  Warnings:

  - You are about to drop the column `imageType` on the `gallery` table. All the data in the column will be lost.
  - Added the required column `description` to the `Gallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gallery` DROP COLUMN `imageType`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
