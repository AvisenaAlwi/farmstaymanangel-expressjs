/*
  Warnings:

  - Added the required column `noBooking` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `noBooking` VARCHAR(191) NOT NULL;
