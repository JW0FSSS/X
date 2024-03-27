/*
  Warnings:

  - You are about to drop the column `like` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `like`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `like`;

-- CreateTable
CREATE TABLE `Like_Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like_Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `commentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Like_Post` ADD CONSTRAINT `Like_Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like_Post` ADD CONSTRAINT `Like_Post_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like_Comment` ADD CONSTRAINT `Like_Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like_Comment` ADD CONSTRAINT `Like_Comment_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
