import { Request, Response } from "express";

import * as productService from "service/product.service";
import { IProduct } from "types/interface/product";

export const findAllProductsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const products = await productService.FindAllProductsService();
    if (!products) {
      return res.status(400);
    }
    return res.status(200).send(products);
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const findProductByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const product = await productService.findProductByIdService(id);
    if (id !== product?.id) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send(product);
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const product: IProduct = req.body;
    const products = await productService.FindAllProductsService();

    const getProduct = products.map((prod) =>
      prod.name.replace(/\s/g, "").toLowerCase(),
    );

    const alreadyExist = getProduct.includes(
      product.name.replace(/\s/g, "").toLowerCase(),
    );

    if (alreadyExist) {
      return res.status(400).send({ message: "Product already existis!" });
    }

    await productService.createProductService(product);

    return res.status(201).send({
      message: "Product created successfully",
      product: { ...product },
    });
  } catch (err: any) {
    console.log(String(err.message));

    console.log(`Erro: ${err}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product: IProduct = req.body;

    const updatedProduct = await productService.updateProductService(
      id,
      product,
    );

    if (!updatedProduct?.id) {
      return res.status(400).send({ message: "Product does not exist" });
    }

    return res.status(200).send({ message: "User updated successfully" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(400).send({ message: "Id not found" });
    }
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const removeProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.removeProductService(id);
    if (!product) {
      return res.status(400).send({ message: "Product does not exist" });
    }
    if (id !== product?.id) {
      return res.status(400).send({ message: "Product not found" });
    }
    return res.status(200).send({ message: "Product removed successfully" });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};
