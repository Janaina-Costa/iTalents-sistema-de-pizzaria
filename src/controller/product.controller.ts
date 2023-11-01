import { Schema, model } from "mongoose";

import { IProduct } from "interface/product";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

const Product = model<IProduct>("product", ProductSchema);

export default Product;
