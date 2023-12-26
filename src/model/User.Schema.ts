/* eslint-disable func-names */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

import { IUser } from "types/interface/user";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    phone: { type: String, required: true },
    addresses: [
      {
        cep: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: String, required: true },
        complement: { type: String },
        neighborhood: { type: String, required: true },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    favorite_product: [
      {
        _id: { type: Schema.Types.ObjectId, unique: true, ref: "product" },

        createdAt: { type: Date, default: Date.now() },
      },
    ],
    isAdmin: { type: Boolean, default: false },
  },

  { timestamps: true },
);
UserSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model<IUser>("users", UserSchema);

export default User;
