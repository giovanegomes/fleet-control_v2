import { handleApiError } from "core/errors/handle-api-errors";
import { deleteVehicle, updateVehicle } from "core/services/vehicle.service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: RouteContext<"/api/vehicles/[id]">,
) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    const vehicle = await updateVehicle(id, data);

    return NextResponse.json(vehicle, { status: 200 });
  } catch (error) {
    const { status, body } = handleApiError(error);

    return NextResponse.json(body, { status });
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
    const { status, body } = handleApiError(error);

    return NextResponse.json(body, { status });
  }
}
