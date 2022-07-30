import { Request, Response, NextFunction } from "express";
import { ApiError } from "@helpers/api-errors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = error.statusCode
    ? error.message
    : "Erro interno do servidor!";
  const statusCode = error.statusCode ?? 500;

  return res.status(statusCode).json({ message });
};
