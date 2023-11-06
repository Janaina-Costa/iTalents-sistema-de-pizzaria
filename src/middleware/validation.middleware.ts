import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { ICart } from "types/interface/cart";
import { IOrder } from "types/interface/order";
import { IProduct } from "types/interface/product";
import { IAdressUser, IFavoriteProduct, IUser } from "types/interface/user";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user: IUser = req.body;
  const error = [];

  if (!user.name) {
    error.push("name");
  }
  if (!user.email) {
    error.push("email");
  }
  if (!user.password) {
    error.push("password");
  }
  if (!user.phone) {
    error.push("phone");
  }

  if (error.length === 0) {
    return next();
  }
  if (error.length > 1) {
    return res
      .status(400)
      .send({ message: `Empty ${error} data are required` });
  }
  return res.status(400).send({ message: `Empty ${error} data is required` });
};

export const validateUserAddress = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const address: IAdressUser = req.body;
  const error = [];

  if (!address.cep) {
    error.push("cep");
  }
  if (!address.street) {
    error.push("street");
  }
  if (!address.number) {
    error.push("number");
  }
  if (!address.neighborhood) {
    error.push("neighborhood");
  }
  if (error.length === 0) {
    return next();
  }
  if (error.length > 1) {
    return res
      .status(400)
      .send({ message: `Empty ${error} data are required` });
  }
  return res.status(400).send({ message: `Empty ${error} data is required` });
};

export const validateFavoriteProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const favoriteProduct: IFavoriteProduct = req.body;
  const error = [];

  if (!favoriteProduct._id) {
    error.push("id");
  }
  if (error.length === 0) {
    return next();
  }
  return res.status(400).send({ message: `Empty ${error} data is required` });
};

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const product: IProduct = req.body;
  const error = [];
  if (!product.name) {
    error.push("name");
  }
  if (!product.description) {
    error.push("description");
  }
  if (!product.image) {
    error.push("image");
  }
  if (!product.size) {
    error.push("size");
  }
  if (!product.price) {
    error.push("price");
  }
  if (error.length === 0) {
    return next();
  }
  if (error.length > 1) {
    return res
      .status(400)
      .send({ message: `Empty ${error} data are required` });
  }
  return res.status(400).send({ message: `Empty ${error} data is required` });
};

export const validateCart = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cart: ICart = req.body;
  const error = [];

  if (!cart.totalPrice) {
    error.push("totalPrice");
  }
  if (!cart.deliveryValue) {
    error.push("deliveryValue");
  }
  if (error.length === 0) {
    return next();
  }
  if (error.length > 1) {
    return res
      .status(400)
      .send({ message: `Empty ${error} data are required` });
  }
  return res.status(400).send({ message: `Empty ${error} data is required` });
};

export const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const order: IOrder = req.body;
  const error = [];

  if (!order.totalPrice) {
    error.push("totalPrice");
  }
  if (!order.deliveryValue) {
    error.push("deliveryValue");
  }

  if (error.length === 0) {
    return next();
  }
  if (error.length > 1) {
    return res
      .status(400)
      .send({ message: `Empty ${error} data are required` });
  }
  return res.status(400).send({ message: `Empty ${error} data is required` });
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  if (isValidObjectId(req.params.id)) {
    return next();
  }
  return res.status(400).send({ message: "Incorrect Id" });
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user: IUser = req.body;
  const error = [];
  if (!user.email) {
    error.push("email");
  }
  if (!user.password) {
    error.push("password");
  }
  if (error.length === 0) {
    return next();
  }
  if (error.length > 1) {
    return res
      .status(400)
      .send({ message: `Empty ${error} data are required` });
  }
  return res.status(400).send({ message: `Empty ${error} data is required` });
};
