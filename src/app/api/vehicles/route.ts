import { createVehicle, getVehicles } from "core/services/vehicle.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const vehicles = await getVehicles();

    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get vehicles", details: String(error) },
      { status: 400 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const vehicle = await createVehicle(body);

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request", details: String(error) },
      { status: 400 },
    );
  }
}
