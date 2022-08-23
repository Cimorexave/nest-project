/*
  Warnings:

  - You are about to drop the `bookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "bookmark";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT
);

-- CreateTable
CREATE TABLE "Bookmarks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_hashedPassword_key" ON "Users"("hashedPassword");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmarks_id_key" ON "Bookmarks"("id");

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
