import { Request, Response } from "express";

import { FindAllProductsService } from "service/product.service";
import * as userService from "service/user.service";
import { IProduct } from "types/interface/product";
import { IAdressUser, IUser } from "types/interface/user";

export const findAllUserController = async (req: Request, res: Response) => {
  try {
    const user = await userService.finAllUsersService();
    if (!user) {
      return res.status(404).send({ message: "Users not found" });
    }
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

    // verifica se o id digitado corresponde a um id existente
    if (user?.id !== id) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;
    await userService.createUserService(user);

    return res.status(201).send({ message: "User created successfully" });
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

    // valida se o id digitado existe
    if (updatedUser?.id !== id) {
      return res.status(404).send({ message: "User not found" });
    }

    return res
      .status(200)
      .send({ updatedUser, message: "User updated successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const removeUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.removeUserService(id);

    // valida se o usuário existe
    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }
    return res.status(200).send({ message: "User removed successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const addUserAddressController = async (req: Request, res: Response) => {
  try {
    const addresses: IAdressUser = req.body;
    const { id } = req.params;
    const user = await userService.findUserByIdService(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // valida se o endereço já está registrado
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

    await userService.addUserAddressService(id, addresses);
    return res.status(201).send({ message: "Address added successfully" });
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
    const user = await userService.findUserByIdService(id);

    // valida se o id do endereço a ser removido existe para o usuário informado
    const addressExists = user?.addresses.map(
      (item) => String(item._id) === addressId,
    );

    if (!addressExists?.includes(true)) {
      return res.status(404).send({ message: "Address not found" });
    }

    await userService.removeUserAddressService(id, addressId);

    return res.status(200).send({ message: "Address removed successfully" });
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

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // valida se o produto existe na base de dados
    const productsId = products.map((item) => {
      /* converte ObjectId em string */
      const productId = String(item._id);
      return productId === favoriteProduct._id;
    });

    if (!productsId.includes(true)) {
      return res.status(404).send({ message: "Product not found" });
    }

    // verifica se o produto já foi adicionado anteriormente
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

    // verifica se o produto a ser removido existe para o usuário indicado
    const favoriteProductExists =
      favoriteProductRemoved.value?.favorite_product.map((item) => {
        if (item._id === undefined) {
          return null;
        }
        const product_Id = String(item._id);
        return product_Id === productId;
      });

    if (!favoriteProductExists?.includes(true)) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send({ message: "Product removed successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};
