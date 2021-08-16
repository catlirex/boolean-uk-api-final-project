/*
  Warnings:

  - You are about to drop the `Coffee_order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Coffee_orderToSpecial_request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Special_request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coffee_order" DROP CONSTRAINT "Coffee_order_coffee_id_fkey";

-- DropForeignKey
ALTER TABLE "Coffee_order" DROP CONSTRAINT "Coffee_order_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "_Coffee_orderToSpecial_request" DROP CONSTRAINT "_Coffee_orderToSpecial_request_A_fkey";

-- DropForeignKey
ALTER TABLE "_Coffee_orderToSpecial_request" DROP CONSTRAINT "_Coffee_orderToSpecial_request_B_fkey";

-- DropTable
DROP TABLE "Coffee_order";

-- DropTable
DROP TABLE "_Coffee_orderToSpecial_request";

-- DropTable
DROP TABLE "Special_request";

-- CreateTable
CREATE TABLE "SpecialRequest" (
    "id" SERIAL NOT NULL,
    "request" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoffeeOrder" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "coffee_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoffeeOrderToSpecialRequest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeOrderToSpecialRequest_AB_unique" ON "_CoffeeOrderToSpecialRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeOrderToSpecialRequest_B_index" ON "_CoffeeOrderToSpecialRequest"("B");

-- AddForeignKey
ALTER TABLE "CoffeeOrder" ADD FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoffeeOrder" ADD FOREIGN KEY ("coffee_id") REFERENCES "Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeOrderToSpecialRequest" ADD FOREIGN KEY ("A") REFERENCES "CoffeeOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeOrderToSpecialRequest" ADD FOREIGN KEY ("B") REFERENCES "SpecialRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
