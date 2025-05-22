/*
  Warnings:

  - You are about to alter the column `status` on the `vehicle` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - Changed the type of `year` on the `vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `vehicle` MODIFY `status` ENUM('Available', 'Unavailable', 'Rented') NOT NULL DEFAULT 'Available',
    DROP COLUMN `year`,
    ADD COLUMN `year` INTEGER NOT NULL;
