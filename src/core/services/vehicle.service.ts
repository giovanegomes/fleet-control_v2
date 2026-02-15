import {
  createVehicleSchema,
  updateVehicleSchema,
} from "core/validators/vehicle.schema";
import { vehicleRepository } from "../repositories/vehicle.repository";
import { uuidSchema } from "core/db/schema/validators";
import { NotFound } from "core/errors/not-found";

export async function getVehicles() {
  return vehicleRepository.get();
}

export async function createVehicle(data: unknown) {
  const vehicle = createVehicleSchema.parse(data);

  return vehicleRepository.create(vehicle);
}

export async function updateVehicle(id: string, data: unknown) {
  const validId = uuidSchema.parse(id);
  const vehicle = updateVehicleSchema.parse(data);
  const result = await vehicleRepository.update(validId, vehicle);

  if (result.length === 0) {
    throw new NotFound(`Vehicle with UUID "${validId}"`);
  }

  return result[0];
}

export async function deleteVehicle(id: string) {
  const validId = uuidSchema.parse(id);
  const result = await vehicleRepository.delete(validId);

  if (result.length === 0) {
    throw new NotFound(`Vehicle with UUID "${validId}"`);
  }
}
