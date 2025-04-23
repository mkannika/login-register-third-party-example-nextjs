import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
};
export const clearDB = async () => {
  try {
    await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Post" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Comment" CASCADE`;
    console.log("Cleared the database");
  } catch (error) {
    console.error("Error clearing the database:", error);
  }
};
