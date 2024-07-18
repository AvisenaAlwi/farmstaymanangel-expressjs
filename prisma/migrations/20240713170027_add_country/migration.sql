/*
  Warnings:

  - You are about to drop the column `country` on the `guest` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guest` DROP COLUMN `country`,
    ADD COLUMN `countryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `capital` VARCHAR(191) NULL,
    `region` VARCHAR(191) NULL,
    `subregion` VARCHAR(191) NULL,
    `population` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Guest` ADD CONSTRAINT `Guest_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
