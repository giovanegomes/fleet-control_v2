import { makeRequest } from "@/_tests_helpers/make-request";
import { POST } from "@/app/api/vehicles/route";
import { Conflict } from "@/core/errors/conflict";
import { createVehicle } from "@/core/services/vehicle.service";

jest.mock("@/core/services/vehicle.service");

const UUID_MOCK = "10fe5a2d-dbe8-42bd-8ef9-bbe88545876d";
const VEHICLE_MOCK = {
  plateNumber: "BAC-4455",
  brand: "Fiat",
  model: "Palio",
  year: 2006,
  mileage: 100000,
  fuelType: "GAS",
};

const mockedCreateVehicle = createVehicle as jest.Mock;

describe("POST to vehicles endpoint validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST to /api/vehicles should return 201", async () => {
    mockedCreateVehicle.mockResolvedValue({ ...VEHICLE_MOCK, id: UUID_MOCK });

    const request = makeRequest("POST", "vehicles", VEHICLE_MOCK);
    const response = await POST(request);

    expect(response.status).toBe(201);

    const responseBody = await response.json();
    expect("id" in responseBody).toBe(true);
  });

  it("Repeated plate number should return 409", async () => {
    mockedCreateVehicle.mockRejectedValue(
      new Conflict("Vehicle already exists."),
    );

    const request = makeRequest("POST", "vehicles", VEHICLE_MOCK);
    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(409);
    expect(responseBody.message).toContain("already exists");
  });

  it("Unexpected error should return 500", async () => {
    mockedCreateVehicle.mockRejectedValue(new Error("Database down"));

    const request = makeRequest("POST", "vehicles", VEHICLE_MOCK);
    const response = await POST(request);

    expect(response.status).toBe(500);

    const body = await response.json();
    expect(body.message).toBeDefined();
  });

  it("Should call service with correct payload", async () => {
    mockedCreateVehicle.mockResolvedValue({ ...VEHICLE_MOCK, id: UUID_MOCK });

    const request = makeRequest("POST", "vehicles", VEHICLE_MOCK);
    await POST(request);

    expect(mockedCreateVehicle).toHaveBeenCalledTimes(1);
    expect(mockedCreateVehicle).toHaveBeenCalledWith(VEHICLE_MOCK);
  });
});
