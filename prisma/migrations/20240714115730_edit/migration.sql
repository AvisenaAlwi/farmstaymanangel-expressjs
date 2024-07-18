/*
  Warnings:

  - You are about to drop the column `BookingMethode` on the `booking` table. All the data in the column will be lost.
  - Added the required column `bookingMethod` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `BookingMethode`,
    ADD COLUMN `bookingMethod` VARCHAR(191) NOT NULL;
