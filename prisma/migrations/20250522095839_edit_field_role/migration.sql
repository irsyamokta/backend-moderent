/*
  Warnings:

  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `status`,
    MODIFY `role` ENUM('ADMIN', 'CLIENT') NOT NULL DEFAULT 'CLIENT';
