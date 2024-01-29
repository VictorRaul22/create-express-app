import httpStatus from "http-status";

export const APP_ERROR = "APP_ERROR";

export class AppError extends Error {
  message: string;
  status: number;
  constructor(message?: string, status?: number) {
    super(message ?? undefined);
    this.name = APP_ERROR;
    this.status = status ?? httpStatus.INTERNAL_SERVER_ERROR;
  }
}
