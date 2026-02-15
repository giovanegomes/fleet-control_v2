import { AppError } from "./app-error";

export class Validation extends AppError {
  statusCode = 422;
  code = "VALIDATION";

  constructor(message = "Invalid input") {
    super(message);
  }
}
