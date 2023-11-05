import { Document } from "mongoose";

import { IProduct } from "./product";

export interface IOrder extends Document {
  products: IProduct[];
  totalPrice: number;
  deliveryValue: number;
  userId: string;
  orderCompleted: boolean;
}
