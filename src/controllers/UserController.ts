import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@schemas/User";
import { ApiError, BadRequestError } from "@helpers/api-errors";

type UserControllerResponse = Response | ApiError;

class UserController {
  async findOne(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const user = await User.findById(id, "-password");

    if (user) return res.json({ user });
    else throw new BadRequestError("Usuário não encontrado!");
  }
}

export default new UserController();
