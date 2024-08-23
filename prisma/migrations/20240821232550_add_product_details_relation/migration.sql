-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "application" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "purshaseRequest" INTEGER NOT NULL,
    "whintorCode" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfPurchase" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "product_details" (
    "product_id" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "archive_link" BLOB NOT NULL,
    CONSTRAINT "product_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_product_id_key" ON "product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_details_product_id_key" ON "product_details"("product_id");
