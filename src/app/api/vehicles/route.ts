import { handleApiError } from "core/errors/handle-api-errors";
import { createVehicle, getVehicles } from "core/services/vehicle.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const vehicles = await getVehicles();

    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    const { status, body } = handleApiError(error);

    return NextResponse.json(body, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const vehicle = await createVehicle(data);

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    const { status, body } = handleApiError(error);

    return NextResponse.json(body, { status });
  }
}
