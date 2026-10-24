import { HTTP_METHOD } from "next/dist/server/web/http";
import { NextRequest } from "next/server";

export function makeRequest(
  method: HTTP_METHOD,
  endpoint: string,
  payload: unknown,
) {
  return new NextRequest(`http://localhost/api/${endpoint}`, {
    method,
    body: JSON.stringify(payload),
  });
}
