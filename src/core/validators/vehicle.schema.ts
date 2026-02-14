import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { vehicles } from "../db/schema/vehicles";
import { InferInsertModel } from "drizzle-orm";
import z from "zod";

export const selectVehicleSchema = createSelectSchema(vehicles);

export const createVehicleSchema = createInsertSchema(vehicles);

export const updateVehicleSchema = createVehicleSchema.omit({
  id: true,
});

export type VehicleInsert = InferInsertModel<typeof vehicles>;

export type VehicleUpdate = z.infer<typeof updateVehicleSchema>;
