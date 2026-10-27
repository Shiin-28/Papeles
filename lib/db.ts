import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

// Reuse one client across hot reloads in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Copy .env.example to .env.");
  // DATABASE_AUTH_TOKEN is only needed for a hosted libSQL database (e.g. Turso on Vercel).
  const authToken = process.env.DATABASE_AUTH_TOKEN || undefined;
  return new PrismaClient({ adapter: new PrismaLibSql({ url, authToken }) });
}

export const db = globalForPrisma.prisma ?? createClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
