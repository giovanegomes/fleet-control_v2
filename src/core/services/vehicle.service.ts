import { createVehicleSchema } from "core/validators/vehicle.schema";
import { vehicleRepository } from "../repositories/vehicle.repository";

export async function getVehicles() {
  return vehicleRepository.get();
}

export async function createVehicle(data: unknown) {
  console.log("data", data);
  const vehicle = createVehicleSchema.parse(data);

  return vehicleRepository.create(vehicle);
}
