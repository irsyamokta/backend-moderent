/*
  Warnings:

  - You are about to drop the column `resetExpires` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `session` MODIFY `refreshToken` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `resetExpires`,
    DROP COLUMN `resetToken`,
    DROP COLUMN `verificationToken`;
