import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';

// This function is for logging within this script, avoiding a dependency on the vite logger.
function log(message: string, source = "drizzle-migrate") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required for migrations.");
}

// Create a new SQL client specifically for migrations, using the neon http adapter.
const sql = neon(process.env.DATABASE_URL);

// Create a new Drizzle instance using the http-compatible client.
const db = drizzle(sql);

async function runMigrations() {
  try {
    log("Running database migrations...");
    // Pass the http-compatible 'db' instance to the migrator.
    await migrate(db, { migrationsFolder: "./migrations" });
    log("Migrations completed successfully.");
    // Exit successfully
    process.exit(0);
  } catch (error) {
    log(`Migration failed: ${error}`);
    process.exit(1);
  }
}

runMigrations();