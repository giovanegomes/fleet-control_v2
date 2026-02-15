export function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "cause" in error &&
    typeof (error as any).cause === "object" &&
    (error as any).cause?.code === "23505"
  );
}
