import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env'), quiet: true });

export interface DatabaseConfig {
  connectionString: string;
}

export function getDatabaseConfig(): DatabaseConfig {
  if(process.env.DATABASE_URL) {

  return { connectionString: process.env.DATABASE_URL };
  }
  throw new Error('"DATABASE_URL" is not defined.')
}
