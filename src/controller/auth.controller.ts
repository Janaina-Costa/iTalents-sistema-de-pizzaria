import { Request, Response } from "express";

import { SECRET_TOKEN } from "settings";
import { IUser } from "types/interface/user";

import loginUserService from "../service/auth.service";

const secret = SECRET_TOKEN;

const loginUserController = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;
    const userLogin = await loginUserService.login(user.email);

    // verificação de email e senha incorretos
    if (!user.email || user.password !== userLogin?.password) {
      return res
        .status(400)
        .send({ message: "User or password does not exist" });
    }
    const token = loginUserService.generateToken(userLogin, secret);

    return res.status(200).send({
      token,
      id: userLogin.id,
      email: userLogin.email,
    });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export default loginUserController;
