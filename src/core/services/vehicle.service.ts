import {
  createVehicleSchema,
  updateVehicleSchema,
} from "core/validators/vehicle.schema";
import { vehicleRepository } from "../repositories/vehicle.repository";

export async function getVehicles() {
  return vehicleRepository.get();
}

export async function createVehicle(data: unknown) {
  const vehicle = createVehicleSchema.parse(data);

  return vehicleRepository.create(vehicle);
}

export async function updateVehicle(id: string, data: unknown) {
  const vehicle = updateVehicleSchema.parse(data);

  return vehicleRepository.update(id, vehicle);
}

export async function deleteVehicle(id: string) {
  return vehicleRepository.delete(id);
}
