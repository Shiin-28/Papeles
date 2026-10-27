// Applies prisma/migrations/*/migration.sql to the database in DATABASE_URL (with
// DATABASE_AUTH_TOKEN for Turso). Use it for a hosted libSQL database, which `prisma migrate`
// can't reach. Already-applied migrations are recorded and skipped, so it's safe to re-run.
//
// Usage: pnpm db:migrate:remote   (reads .env, or the real environment)
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@libsql/client";

try {
  process.loadEnvFile();
} catch {
  // No .env file: use the real environment.
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}
if (url.startsWith("file:")) {
  console.error(
    [
      `DATABASE_URL points to a local file (${url}), not Turso.`,
      "This command is for the hosted database. Put your Turso values in .env first:",
      '  DATABASE_URL="libsql://your-db-name-yourname.turso.io"',
      '  DATABASE_AUTH_TOKEN="your-token"',
      "then save the file (Ctrl+S) and run it again. For the local database, use: pnpm db:migrate",
    ].join("\n"),
  );
  process.exit(1);
}
const authToken = process.env.DATABASE_AUTH_TOKEN || undefined;
if (!authToken)
  console.warn("Warning: DATABASE_AUTH_TOKEN is empty; Turso will reject the connection.");
console.log(`Target: ${new URL(url).host}`);
const db = createClient({ url, authToken });

await db.execute(
  "CREATE TABLE IF NOT EXISTS _papeles_migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL)",
);
const done = new Set(
  (await db.execute("SELECT name FROM _papeles_migrations")).rows.map((r) => r.name),
);

const dir = join("prisma", "migrations");
const names = readdirSync(dir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(dir, d.name, "migration.sql")))
  .map((d) => d.name)
  .sort();

let applied = 0;
for (const name of names) {
  if (done.has(name)) continue;
  await db.executeMultiple(readFileSync(join(dir, name, "migration.sql"), "utf8"));
  await db.execute({
    sql: "INSERT INTO _papeles_migrations (name, applied_at) VALUES (?, ?)",
    args: [name, new Date().toISOString()],
  });
  console.log(`Applied ${name}`);
  applied++;
}
console.log(applied ? `Done: ${applied} migration(s) applied.` : "Database is already up to date.");
db.close();
