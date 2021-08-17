-- DropForeignKey
ALTER TABLE "SpecialRequest_CoffeeOrder" DROP CONSTRAINT "SpecialRequest_CoffeeOrder_coffeeOrderId_fkey";

-- DropForeignKey
ALTER TABLE "SpecialRequest_CoffeeOrder" DROP CONSTRAINT "SpecialRequest_CoffeeOrder_specialRequestId_fkey";

-- AddForeignKey
ALTER TABLE "SpecialRequest_CoffeeOrder" ADD FOREIGN KEY ("specialRequestId") REFERENCES "SpecialRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialRequest_CoffeeOrder" ADD FOREIGN KEY ("coffeeOrderId") REFERENCES "CoffeeOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
