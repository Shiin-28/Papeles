import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

// One client per server process (also survives hot reloads in development).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Copy .env.example to .env.");
  // DATABASE_AUTH_TOKEN is only needed for a hosted libSQL database (e.g. Turso on Vercel).
  const authToken = process.env.DATABASE_AUTH_TOKEN || undefined;
  return new PrismaClient({ adapter: new PrismaLibSql({ url, authToken }) });
}

/**
 * The database client, created on first use rather than when this file is imported. That way
 * `next build` never needs DATABASE_URL, and a missing setting only affects the API routes
 * that use the database (with a clear error) instead of failing the whole deploy.
 */
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = (globalForPrisma.prisma ??= createClient());
    return Reflect.get(client, prop, client);
  },
});
