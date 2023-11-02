/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import { Request, Response } from "express";

import * as userService from "service/user.service";
import { IAdressUser, IUser } from "types/interface/user";

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

    if (user?.id !== id) {
      return res.status(400).send({ message: "Id not found" });
    }

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
    const user: IUser = req.body;

    if (!user.name || !user.email || !user.password || !user.phone) {
      return res.status(400).send({ message: "Empty data is required" });
    }

    const newUser = await userService.createUserService(user);

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
    const user: IUser = req.body;

    const updatedUser = await userService.updateUserService(id, user);
    if (updatedUser?.id !== id) {
      return res.status(400).send({ message: "Id not found" });
    }

    return res
      .status(200)
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

export const addUserAddressController = async (req: Request, res: Response) => {
  try {
    const addresses: IAdressUser = req.body;
    const { id } = req.params;
    const user = await userService.findUserByIdService(id);

    if (
      !addresses.cep ||
      !addresses.street ||
      !addresses.number ||
      !addresses.neighborhood
    ) {
      return res.status(400).send({ message: "Empty data is required" });
    }
    const zipCodeAlreadyExistis = user?.addresses.map(
      (item) =>
        item.cep === addresses.cep &&
        item.number === addresses.number &&
        item.complement === addresses.complement,
    );

    if (zipCodeAlreadyExistis?.includes(true)) {
      return res
        .status(400)
        .send({ message: "Address has already registered" });
    }

    const newAddress = await userService.addUserAddressService(id, addresses);

    if (newAddress.ok === 1) {
      return res.status(201).send({ message: "Address added successfully" });
    }

    return res
      .status(400)
      .send({ message: "Something wrong when entering the address" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const removeUserAddressController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { addressId, id } = req.body;
    const addressRemoved = await userService.removeUserAddressService(
      id,
      addressId,
    );
    const existsAddressId = addressRemoved.value?.addresses.map(
      (item) => item._id === id,
    );

    if (existsAddressId?.includes(true)) {
      return res.status(201).send({ message: "Address removed successfully" });
    }
    return res.status(400).send({ message: "Address not found" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};
