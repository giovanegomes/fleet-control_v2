import { deleteVehicle, updateVehicle } from "core/services/vehicle.service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: RouteContext<"/api/vehicles/[id]">,
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const vehicle = await updateVehicle(id, body);

    return NextResponse.json(vehicle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request", details: String(error) },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _: NextRequest,
  context: RouteContext<"/api/vehicles/[id]">,
) {
  try {
    const { id } = await context.params;
    await deleteVehicle(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request", details: String(error) },
      { status: 400 },
    );
  }
}
