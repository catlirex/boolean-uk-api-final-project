/*
  Warnings:

  - You are about to drop the `_CoffeeOrderToSpecialRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CoffeeOrderToSpecialRequest" DROP CONSTRAINT "_CoffeeOrderToSpecialRequest_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoffeeOrderToSpecialRequest" DROP CONSTRAINT "_CoffeeOrderToSpecialRequest_B_fkey";

-- DropTable
DROP TABLE "_CoffeeOrderToSpecialRequest";

-- CreateTable
CREATE TABLE "SpecialRequest_CoffeeOrder" (
    "id" SERIAL NOT NULL,
    "specialRequestId" INTEGER NOT NULL,
    "coffeeOrderId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpecialRequest_CoffeeOrder" ADD FOREIGN KEY ("specialRequestId") REFERENCES "SpecialRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialRequest_CoffeeOrder" ADD FOREIGN KEY ("coffeeOrderId") REFERENCES "CoffeeOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
