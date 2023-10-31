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

export const findUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserByIdService(id);
    return res.status(200).send(user);
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id is incorrect" });
    }
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
    if (err.code === 11000) {
      return res.status(400).send({ message: "User already existis!" });
    }
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, image, address, favorite_item, admin } =
      req.body;

    const updatedUser = await userService.updateUserService(id, {
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
      .send({ updatedUser, message: "User updated successfully" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id not found" });
    }
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const removeUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.removeUserService(id);
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    return res.status(200).send({ message: "User removed successfully" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id not found" });
    }
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};
