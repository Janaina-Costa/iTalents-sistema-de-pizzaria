import { Schema, model } from "mongoose";

import ProductSizes from "types/enums/products";
import { IProduct } from "types/interface/product";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, enum: ProductSizes },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

const Product = model<IProduct>("product", ProductSchema);

export default Product;
