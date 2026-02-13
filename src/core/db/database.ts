import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

class DatabaseService {
  static #instance: DatabaseService;
  db: NeonHttpDatabase<typeof schema>;

  private constructor() {
    const sql = neon(process.env.DATABASE_URL!);

    this.db = drizzle(sql, { schema });
  }

  static getInstance() {
    if (!DatabaseService.#instance) {
      DatabaseService.#instance = new DatabaseService();
    }

    return DatabaseService.#instance;
  }
}

export const databaseService = DatabaseService.getInstance();
export const db = databaseService.db;
