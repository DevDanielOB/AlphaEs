/*
  Warnings:

  - Added the required column `dateOfPurchase` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "application" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "purshaseRequest" INTEGER NOT NULL,
    "whintorCode" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfPurchase" DATETIME NOT NULL
);
INSERT INTO "new_product" ("application", "balance", "createdAt", "id", "name", "price", "purshaseRequest", "quantity", "whintorCode") SELECT "application", "balance", "createdAt", "id", "name", "price", "purshaseRequest", "quantity", "whintorCode" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
