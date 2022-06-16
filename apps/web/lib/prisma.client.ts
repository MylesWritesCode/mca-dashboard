import { PrismaClient } from "@prisma/client";

export const SingletonClient = new PrismaClient();

export default SingletonClient;
