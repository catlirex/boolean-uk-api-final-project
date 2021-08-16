-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'procressing', 'ready', 'collected');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coffee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "ice" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Special_request" (
    "id" SERIAL NOT NULL,
    "request" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coffee_order" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "coffee_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'pending',
    "transaction_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimated_pickup_time" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Coffee_orderToSpecial_request" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.phone_number_unique" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Shop.postcode_unique" ON "Shop"("postcode");

-- CreateIndex
CREATE UNIQUE INDEX "_Coffee_orderToSpecial_request_AB_unique" ON "_Coffee_orderToSpecial_request"("A", "B");

-- CreateIndex
CREATE INDEX "_Coffee_orderToSpecial_request_B_index" ON "_Coffee_orderToSpecial_request"("B");

-- AddForeignKey
ALTER TABLE "Coffee_order" ADD FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coffee_order" ADD FOREIGN KEY ("coffee_id") REFERENCES "Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Coffee_orderToSpecial_request" ADD FOREIGN KEY ("A") REFERENCES "Coffee_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Coffee_orderToSpecial_request" ADD FOREIGN KEY ("B") REFERENCES "Special_request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
