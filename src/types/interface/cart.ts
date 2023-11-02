import { Document } from "mongoose";

import { IProduct } from "./product";

export interface ICart extends Document {
  products: IProduct[];
  totalPrice: number;
  delivery_fee: number;
  userId: string;
}
