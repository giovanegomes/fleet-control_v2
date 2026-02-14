import { createSelectSchema } from "drizzle-zod";
import { vehicles } from "../db/schema/vehicles";
import z from "zod";
import { FUEL_TYPES } from "core/db/schema/enums";

export const selectVehicleSchema = createSelectSchema(vehicles);

export const createVehicleSchema = z.object({
  plateNumber: z
    .string("Plate number is required.")
    .toUpperCase()
    .trim()
    .regex(/^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/, "Plate number is invalid."),
  brand: z.string("Brand is required.").min(1, "Brand is required."),
  model: z.string("Model is required.").min(1, "Model is required."),
  year: z
    .number("Year is required.")
    .int("Year must be a number.")
    .min(1900, "Year must be greater than or equal to 1900.")
    .max(new Date().getFullYear() + 1, "Year is invalid."),
  mileage: z
    .number("Mileage is required.")
    .nonnegative("Mileage must be zero or greater."),

  fuelType: z.enum(FUEL_TYPES, {
    message: "Invalid fuel type.",
  }),
});

export const updateVehicleSchema = createVehicleSchema.partial();

export type VehicleSchema = z.infer<typeof createVehicleSchema>;
