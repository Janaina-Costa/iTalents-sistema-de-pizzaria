import { Request, Response } from "express";

import * as cartService from "service/cart.service";
import { FindAllProductsService } from "service/product.service";
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

    // verifica se o cart pesquisado existe
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    return res.status(200).send(cart);
  } catch (err: any) {
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
    const product = await FindAllProductsService();

    const cartBody = {
      ...cart,
      userId: req.userId,
    };
    const cartProductId = cartBody?.products.map((p) => p._id);

    // verifica se o produto que se quer criar existe na base de dados
    const existisProductId = product.map(
      (item) => String(cartProductId) === item.id,
    );
    if (!existisProductId.includes(true)) {
      return res.status(404).send({ message: "Product not found" });
    }

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
    const cartBody: ICart = req.body;
    const cart = await cartService.findCartByIdService(id);

    // verifica se o produto informado para update existe na lista de produtos do carrinho selecionado
    const productBodyId = cartBody.products.map((item) => item._id);
    const existisProduct = cart?.products.map(
      (i) => String(i._id) === String(productBodyId),
    );

    if (!existisProduct?.includes(true)) {
      return res.status(404).send({ message: "Product not found" });
    }

    await cartService.updateCartService(id, cartBody);

    return res.status(200).send({ message: "Cart updated successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const removeCartController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart = await cartService.removeCartService(id);
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    return res.status(201).send({ message: "Cart deleted successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};
