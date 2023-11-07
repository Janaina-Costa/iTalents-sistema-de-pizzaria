import { Request, Response } from "express";

import * as orderService from "service/order.service";
import { FindAllProductsService } from "service/product.service";
import { IOrder } from "types/interface/order";

interface IGetUserAuthRequest extends Request {
  userId?: string;
}

export const findAllOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.findAllOrdersService();

    return res.status(200).send(orders);
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const findOrderByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderService.findOrderByIdService(id);
    if (!order) {
      return res.status(404).send({ message: "Order not found or not exists" });
    }
    return res.status(200).send(order);
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id is incorrect" });
    }
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const createOrdersController = async (
  req: IGetUserAuthRequest,
  res: Response,
) => {
  try {
    const order: IOrder = req.body;
    const product = await FindAllProductsService();
    const orderBody = {
      ...order,
      userId: req.userId,
    };

    const cartProductId = orderBody?.products.map((p) => p._id);

    const existisProductId = product.map(
      (item) => String(cartProductId) === item.id,
    );
    if (!existisProductId.includes(true)) {
      return res.status(404).send({ message: "Product not found" });
    }
    await orderService.createOrderService(orderBody);

    return res.status(201).send({ message: "Order created successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const removeOrderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderService.findOrderByIdService(id);
    if (!order) {
      return res.status(404).send({ message: "Order not found or not exists" });
    }
    await orderService.deleteOrderService(id);

    return res.status(200).send({ message: "Order removed successfully" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id is incorrect" });
    }
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const updateStatusOrderController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const statusId = await orderService.updateStatusOrderService(id);
    if (!statusId) {
      return res.status(404).send({ message: "Order not found or not exists" });
    }

    return res.status(200).send({ message: "Status updated successfully" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id is incorrect" });
    }
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};
