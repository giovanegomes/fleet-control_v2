import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const fuelTypeEnum = pgEnum("fuel_type", [
  "GAS",
  "DSL",
  "ETH",
  "ELE",
  "HYB",
]);

export const vehicles = pgTable(
  "vehicles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    plateNumber: text("plate_number").notNull(),
    brand: text("brand").notNull(),
    model: text("model").notNull(),
    year: integer("year").notNull(),
    mileage: integer("mileage").notNull().default(0),
    fuelType: fuelTypeEnum(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  ({ plateNumber }) => ({
    plateUnique: uniqueIndex("vehicles_plate_unique").on(plateNumber),
  }),
);

export const vehiclesSelectSchema = createSelectSchema(vehicles);
