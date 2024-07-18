/*
  Warnings:

  - Added the required column `BookingMethode` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `BookingMethode` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentDate` DATETIME(3) NOT NULL,
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentStatus` VARCHAR(191) NOT NULL;
