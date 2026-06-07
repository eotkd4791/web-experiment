import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env'), quiet: true });

export interface DatabaseConfig {
  connectionString: string;
}

export function getDatabaseConfig(): DatabaseConfig {
  const connectionString = process.env.DATABASE_URL;

  if (connectionString) {
    return { connectionString };
  }

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const host = process.env.DB_HOST ?? 'localhost';
  const port = process.env.DB_PORT ?? '5432';

  if (!user || !password || !database) {
    throw new Error(
      'Database configuration is missing. Set DATABASE_URL or DB_USER, DB_PASSWORD, and DB_NAME.',
    );
  }

  return {
    connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
  };
}
