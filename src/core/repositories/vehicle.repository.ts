import { db } from "core/db/database";
import { vehicles } from "../db/schema/vehicles";
import { VehicleInsert } from "core/validators/vehicle.schema";

export const vehicleRepository = {
  get() {
    return db.select().from(vehicles);
  },
  create(data: VehicleInsert) {
    return db.insert(vehicles).values(data).returning();
  },
};
