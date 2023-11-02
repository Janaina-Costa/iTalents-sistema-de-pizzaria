import { IProduct } from "types/interface/product";

import Product from "../model/Product.Schema";

export const FindAllProductsService = () => Product.find();

export const findProductByIdService = (id: string) => Product.findById(id);

export const createProductService = ({ ...props }: IProduct) =>
  Product.create({ ...props });

export const updateProductService = (id: string, { ...props }: IProduct) =>
  Product.findByIdAndUpdate(id, { ...props }, { returnDocument: "after" });

export const removeProductService = (id: string) =>
  Product.findByIdAndDelete(id);
