import { Request, Response } from "express";

import { FindAllProductsService } from "service/product.service";
import * as userService from "service/user.service";
import { IProduct } from "types/interface/product";
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
      return res.status(400).send({ message: "Product not found" });
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
    const { id, addressId } = req.body;
    const addressRemoved = await userService.removeUserAddressService(
      id,
      addressId,
    );
    const existsAddressId = addressRemoved.value?.addresses.map(
      (item) => item._id === id,
    );

    if (!existsAddressId?.includes(true)) {
      return res.status(400).send({ message: "Address not found" });
    }

    return res.status(201).send({ message: "Address removed successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const addUserFavoriteProductController = async (
  req: Request,
  res: Response,
) => {
  try {
    const favoriteProduct: IProduct = req.body;
    const { id } = req.params;
    const user = await userService.findUserByIdService(id);
    const products = await FindAllProductsService();

    if (!favoriteProduct._id) {
      return res.status(400).send({ message: "Empty data is required" });
    }

    const productsId = products.map((item) => {
      /* converte ObjectId em string */
      const productId = String(item._id);
      return productId === favoriteProduct._id;
    });

    if (!productsId.includes(true)) {
      return res.status(400).send({ message: "Product not found" });
    }
    const favoriteProductAlreadyExists = user?.favorite_product.map((item) => {
      if (item._id === undefined) {
        return null;
      }
      /* converte ObjectId em string */
      const favoriteId = String(item._id);
      return favoriteId === favoriteProduct._id;
    });

    if (favoriteProductAlreadyExists?.includes(true)) {
      return res
        .status(400)
        .send({ message: "Product has already add as favorite" });
    }

    await userService.addUserFavoriteProductService(id, favoriteProduct);
    return res
      .status(201)
      .send({ message: "Favorite product added successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const removeUserFavoriteProductController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id, productId } = req.body;

    const favoriteProductRemoved =
      await userService.removeUserFavoriteProductService(id, productId);

    const favoriteProductExists =
      favoriteProductRemoved.value?.favorite_product.map((item) => {
        if (item._id === undefined) {
          return null;
        }
        const product_Id = String(item._id);
        return product_Id === productId;
      });

    if (!favoriteProductExists?.includes(true)) {
      return res.status(400).send({ message: "Product not found" });
    }
    return res.status(201).send({ message: "Product removed successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};
