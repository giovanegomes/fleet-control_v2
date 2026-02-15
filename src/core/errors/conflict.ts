import { AppError } from "./app-error";

export class Conflict extends AppError {
  statusCode = 409;
  code = "CONFLICT";

  constructor(message: string) {
    super(message);
  }
}
