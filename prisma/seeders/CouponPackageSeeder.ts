import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const couponPackages = [
  {
    id: `CP-${uuidv4()}`,
    name: 'Basic',
    price: 100,
    totalCoupons: 10,
  },
  {
    id: `CP-${uuidv4()}`,
    name: 'Premium',
    price: 200,
    totalCoupons: 20,
  },
  {
    id: `CP-${uuidv4()}`,
    name: 'Gold',
    price: 300,
    totalCoupons: 30,
  },
  {
    id: `CP-${uuidv4()}`,
    name: 'Diamond',
    price: 400,
    totalCoupons: 40,
  },
];

async function main() {
  for (const couponPackage of couponPackages) {
    await prisma.couponPackage.create({
      data: couponPackage,
    });
  }
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
