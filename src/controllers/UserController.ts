import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@schemas/User";
import { ApiError, BadRequestError } from "@helpers/api-errors";

interface IUserData {
  name?: string;
  email?: string;
  password?: string;
}

type UserControllerResponse = Response | ApiError;

class UserController {
  async findOne(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const user = await User.findById(id, "-password");

    if (user) return res.json({ user });
    else throw new BadRequestError("Usuário não encontrado!");
  }

  async update(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const data: IUserData = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { ...data },
      { overwrite: true }
    );

    console.log(user);
    if (user) return res.json({ user });
    else throw new BadRequestError("Não foi possível atualizar o usuário!");
  }

  async delete(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const deleteUser = await User.deleteOne({ id });

    if (deleteUser)
      return res.json({ message: "Usuário foi removido com sucesso!" });
    else throw new BadRequestError("Não foi possível remover o usuário!");
  }
}

export default new UserController();
