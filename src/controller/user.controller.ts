/* eslint-disable camelcase */
/* eslint-disable no-console */
import { Request, Response } from "express";

import userService from "service/user.service";

export const findAllUserController = async (req: Request, res: Response) => {
  try {
    const user = await userService.finAllUsersService();
    return res.status(200).send(user);
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, image, address, favorite_item, admin } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ message: "Empty data is required" });
    }

    const newUser = await userService.createUserService({
      name,
      email,
      password,
      image,
      address,
      favorite_item,
      admin,
    });
    return res
      .status(201)
      .send({ newUser, message: "User created successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

// export default { findAllUserController, createUserController };
