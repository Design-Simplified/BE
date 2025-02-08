import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const membershipTypes = [
  {
    id: `MT-${uuidv4()}`,
    name: 'Basic',
    price: 100,
    durationInDay: 30,
  },
  {
    id: `MT-${uuidv4()}`,
    name: 'Premium',
    price: 200,
    durationInDay: 60,
  },
  {
    id: `MT-${uuidv4()}`,
    name: 'Gold',
    price: 300,
    durationInDay: 90,
  },
  {
    id: `MT-${uuidv4()}`,
    name: 'Diamond',
    price: 400,
    durationInDay: 120,
  },
];

async function main() {
  for (const membershipType of membershipTypes) {
    await prisma.membershipType.create({
      data: membershipType,
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
