import { GET } from "@/app/api/vehicles/route";
import { getVehicles } from "@/core/services/vehicle.service";

jest.mock("@/core/services/vehicle.service");

const VEHICLES_MOCK = [
  {
    id: "uuid",
    plateNumber: "BAC-4455",
  },
];

const mockedGetVehicle = getVehicles as jest.Mock;

it("GET to /api/vehicles should return 200", async () => {
  mockedGetVehicle.mockResolvedValue(VEHICLES_MOCK);

  const response = await GET();

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
});
