import { db } from "core/db/database";
import { vehicles } from "../db/schema/vehicles";
import { VehicleInsert, VehicleUpdate } from "core/validators/vehicle.schema";
import { eq } from "drizzle-orm";

export const vehicleRepository = {
  get() {
    return db.select().from(vehicles);
  },
  create(data: VehicleInsert) {
    return db.insert(vehicles).values(data).returning();
  },
  update(id: string, data: VehicleUpdate) {
    return db
      .update(vehicles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(vehicles.id, id))
      .returning();
  },
  delete(id: string) {
    return db.delete(vehicles).where(eq(vehicles.id, id)).returning();
  },
};
