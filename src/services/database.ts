import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

class DatabaseService {
  static #instance: DatabaseService;
  database: NeonHttpDatabase<typeof schema>;

  private constructor() {
    const sql = neon(process.env.DATABASE_URL!);

    this.database = drizzle(sql, { schema });
  }

  static getInstance() {
    if (!DatabaseService.#instance) {
      DatabaseService.#instance = new DatabaseService();
    }

    return DatabaseService.#instance;
  }
}

export const databaseService = DatabaseService.getInstance();
