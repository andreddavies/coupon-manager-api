import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MongooseError } from "mongoose";

import config from "@config";
import User from "@schemas/User";
import { ApiError, BadRequestError } from "@helpers/api-errors";

type UserControllerResponse = Response | ApiError;

class UserController {
  async create(req: Request, res: Response): Promise<UserControllerResponse> {
    const { name, email, password } = req.body;

    if (!name) throw new BadRequestError("O campo nome é obrigatório");

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
      .catch((err: MongooseError) => {
        throw new ApiError(400, err.message);
      });
  }

  async login(req: Request, res: Response): Promise<UserControllerResponse> {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new BadRequestError("Usuário não existe!");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new BadRequestError("Senha inválida");

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

  async findOne(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const user = await User.findById(id, "-password");

    if (!user) throw new BadRequestError("Usuário não encontrado!");

    return res.json({ user });
  }

  async update(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const { email, name } = req.body;
    const user = await User.findById(id)
      .then(async (res) => {
        return await User.findByIdAndUpdate(id, {
          email: !!email ? email : res.email,
          name: !!name ? name : res.name,
          password: res.password,
        });
      })
      .catch((err) => {
        return err;
      });

    if (user) {
      const { password } = req.body;

      if (!!password) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        await User.findByIdAndUpdate(id, { password: passwordHash })
          .then(async (response) => {
            const returnData = await User.findById(response._id, "-password");

            return res.json({ user: returnData });
          })
          .catch((err) => {
            throw new ApiError(500, err);
          });
      } else {
        const returnUser = await User.findById(id);
        console.log(returnUser);
        return res.json({ user: returnUser });
      }
    } else throw new BadRequestError("Não foi possível atualizar o usuário!");
  }

  async delete(req: Request, res: Response): Promise<UserControllerResponse> {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) throw new ApiError();

    return res.json({ message: "Usuário foi removido com sucesso!" });
  }
}

export default new UserController();
