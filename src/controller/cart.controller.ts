import { Request, Response } from "express";

import * as cartService from "service/cart.service";
import { ICart } from "types/interface/cart";

interface IGetUserAuthRequest extends Request {
  userId?: string;
}

export const findAllCartController = async (req: Request, res: Response) => {
  try {
    const carts = await cartService.findAllCartService();
    return res.status(200).send(carts);
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const findCartByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart = await cartService.findCartByIdService(id);

    return res.status(200).send(cart);
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id is incorrect" });
    }
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const createCartController = async (
  req: IGetUserAuthRequest,
  res: Response,
) => {
  try {
    const cart: ICart = req.body;
    const cartBody = {
      ...cart,
      userId: req.userId,
    };

    await cartService.createCartService(cartBody);

    return res.status(200).send({ message: "Cart created successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const updateCartController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart: ICart = req.body;

    await cartService.updateCartService(id, cart);

    return res.status(200).send({ message: "Cart updated successfully" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id not found" });
    }
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const removeCartController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await cartService.removeCartService(id);

    return res.status(201).send({ message: "Cart deleted successfully" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id not found" });
    }
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};
