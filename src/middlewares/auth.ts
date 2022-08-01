import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "@config";
import { UnauthorizedError } from "@helpers/api-errors";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];

  if (!token) throw new UnauthorizedError("Não autorizado!");

  const { secret } = config;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) throw new UnauthorizedError("Não autorizado!");
    if (decoded) next();
  });
};
