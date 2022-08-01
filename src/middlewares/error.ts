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

  if (message.indexOf("duplicate key") !== -1) {
    const error = message.split("dup key: { ")[1].split(":")[0];

    return res
      .status(statusCode)
      .json({ message: `Campo ${error} com chave duplicada!` });
  }

  if (message.indexOf("is required") !== -1) {
    return res
      .status(statusCode)
      .json({ message: `Todos os campos são obrigatórios!` });
  }

  return res.status(statusCode).json({ message });
};
