import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "@config";
import User from "@schemas/User";
import { ApiError, BadRequestError } from "@helpers/api-errors";

interface IUserData {
  name: string;
  email: string;
  password: string;
}

type UserControllerResponse = Response | ApiError;

class UserController {
  async create(req: Request, res: Response): Promise<UserControllerResponse> {
    const { name, email, password }: IUserData = req.body;

    if (!name || !email || !password)
      throw new BadRequestError("Todos os campos são obrigatórios!");

    const user = await User.findOne({ email });
    if (user) throw new BadRequestError("Este e-mail já está sendo utilizado!");

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    return await User.create({
      name,
      email,
      password: passwordHash,
    })
      .then(async (response) => {
        const finalUser = await User.findById(response._id, "-password");

        return res.json({ user: finalUser });
      })
      .catch((err) => {
        throw new ApiError(err);
      });
  }

  async login(req: Request, res: Response): Promise<UserControllerResponse> {
    const { email, password } = req.body;

    if (!email || !password)
      throw new BadRequestError("Todos os campos são obrigatórios!");

    const user = await User.findOne({ email });
    if (!user) throw new BadRequestError("Usuário não existe!");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new BadRequestError("Senha inválida");
    else {
      const { secret } = config;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      return res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    }
  }

  async findOne(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const user = await User.findById(id, "-password");

    if (user) return res.json({ user });
    else throw new BadRequestError("Usuário não encontrado!");
  }

  async update(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const { email, name }: IUserData = req.body;
    const user = await User.findByIdAndUpdate(id, { email, name });

    if (user) {
      const { password }: IUserData = req.body;

      if (password) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        await User.findByIdAndUpdate(id, { password: passwordHash })
          .then(async (response) => {
            const returnData = await User.findById(response._id, "-password");

            return res.json({ user: returnData });
          })
          .catch((err) => {
            throw new ApiError(err);
          });
      } else return res.json({ user });
    } else throw new BadRequestError("Não foi possível atualizar o usuário!");
  }

  async delete(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);

    if (deleteUser)
      return res.json({ message: "Usuário foi removido com sucesso!" });
    else throw new BadRequestError("Não foi possível remover o usuário!");
  }
}

export default new UserController();
