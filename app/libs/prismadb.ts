// prisma.db

import { PrismaClient } from "@prisma/client";

// Declare the global variable for Prisma Client
declare global {
  var prisma: PrismaClient;
}

// Initialize the Prisma Client instance
const prisma = global.prisma || new PrismaClient();

// Assign the Prisma Client instance to the global variable
if (process.env.NODE_ENV === "production") {
  global.prisma = prisma;
}

// Export the Prisma Client instance
export default prisma;
