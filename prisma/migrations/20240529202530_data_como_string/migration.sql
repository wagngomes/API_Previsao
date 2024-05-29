/*
  Warnings:

  - Made the column `data_colocacao` on table `Map` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Map" ALTER COLUMN "data_colocacao" SET NOT NULL,
ALTER COLUMN "data_colocacao" SET DATA TYPE TEXT;
