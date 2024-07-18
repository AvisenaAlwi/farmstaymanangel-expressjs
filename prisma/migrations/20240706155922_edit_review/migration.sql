/*
  Warnings:

  - You are about to drop the column `date` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `review` table. All the data in the column will be lost.
  - Added the required column `content` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `date`,
    DROP COLUMN `from`,
    DROP COLUMN `review`,
    DROP COLUMN `title`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` INTEGER NOT NULL;
