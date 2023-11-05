import { Schema, model } from "mongoose";

import { IOrder } from "types/interface/order";

const OrderSchema = new Schema(
  {
    products: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, required: true, default: 0 },
      },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
    deliveryValue: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    orderCompleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const Order = model<IOrder>("orders", OrderSchema);

export default Order;
