import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { vehicles } from "../db/schema/vehicles";
import { InferInsertModel } from "drizzle-orm";
import z from "zod";

export const selectVehicleSchema = createSelectSchema(vehicles);

export const createVehicleSchema = createInsertSchema(vehicles);

export const updateVehicleSchema = createUpdateSchema(vehicles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type VehicleInsert = InferInsertModel<typeof vehicles>;

export type VehicleUpdate = z.infer<typeof updateVehicleSchema>;
