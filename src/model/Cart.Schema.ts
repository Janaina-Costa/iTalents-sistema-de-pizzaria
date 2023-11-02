import { Schema, model } from "mongoose";

import { ICart } from "types/interface/cart";

const CartSchema = new Schema(
  {
    products: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, required: true, default: 0 },
      },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
    delivery_fee: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  },
  { timestamps: true },
);

const Cart = model<ICart>("carts", CartSchema);

export default Cart;
