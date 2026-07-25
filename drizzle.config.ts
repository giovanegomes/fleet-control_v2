import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/core/db/migrations",
  schema: "./src/core/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
