import { AppError } from "./app-error";

export class NotFound extends AppError {
  statusCode = 404;
  code = "NOT_FOUND";

  constructor(resource: string) {
    super(`${resource} not found`);
  }
}
