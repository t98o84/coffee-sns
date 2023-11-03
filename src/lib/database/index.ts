import { PrismaClient } from '@prisma/client';

export * from '@/lib/database/schemas';

export const db = new PrismaClient();
