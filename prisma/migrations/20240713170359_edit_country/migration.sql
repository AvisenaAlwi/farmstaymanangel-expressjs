-- AlterTable
ALTER TABLE `country` ADD COLUMN `continents` VARCHAR(191) NULL,
    ADD COLUMN `flags` VARCHAR(191) NULL,
    ADD COLUMN `googlemaps` VARCHAR(191) NULL,
    MODIFY `population` VARCHAR(191) NULL;
