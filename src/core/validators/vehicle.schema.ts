import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { vehicles } from "../db/schema/vehicles";
import { InferInsertModel } from "drizzle-orm";

export type VehicleInsert = InferInsertModel<typeof vehicles>;
export const selectVehicleSchema = createSelectSchema(vehicles);
export const createVehicleSchema = createInsertSchema(vehicles);
