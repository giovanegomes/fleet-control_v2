import { ZodError } from "zod";
import { AppError } from "./app-error";

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      body: {
        error: error.code,
        message: error.message,
      },
    };
  }

  if (error instanceof ZodError) {
    return {
      status: 422,
      body: {
        error: "VALIDATION_ERROR",
        issues: error.issues,
      },
    };
  }

  console.error(error);

  return {
    status: 500,
    body: {
      error: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },
  };
}
