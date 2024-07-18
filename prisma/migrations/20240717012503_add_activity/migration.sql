/*
  Warnings:

  - You are about to drop the column `name` on the `activity` table. All the data in the column will be lost.
  - Added the required column `description` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` DROP COLUMN `name`,
    ADD COLUMN `description` DATETIME(3) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
