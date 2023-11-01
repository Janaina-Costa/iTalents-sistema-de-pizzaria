import { IProduct } from "interface/product";

import Product from "../model/Product.Schema";

const FindAllProductService = () => Product.find();

const findProductByIdService = (id: string) => Product.findById(id);

const createProductService = ({ ...props }: IProduct) =>
  Product.create({ ...props });

const updateProductService = (id: string, { ...props }: IProduct) =>
  Product.findByIdAndUpdate(id, { ...props });

const removeProductService = (id: string) => Product.findByIdAndDelete(id);

export default {
  FindAllProductService,
  findProductByIdService,
  createProductService,
  updateProductService,
  removeProductService,
};
