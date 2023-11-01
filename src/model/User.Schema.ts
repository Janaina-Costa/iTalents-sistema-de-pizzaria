/* eslint-disable func-names */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

import { IUser } from "interface/user";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    addresses: [
      {
        cep: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: Number, required: true },
        complement: { type: String },
        neighborhood: { type: String, required: true },
      },
    ],
    // favorite_item: [
    //   {
    //     _id: Schema.Types.ObjectId,
    //     unique: true,
    //     ref: "products",
    //   },
    // ],
    phone: { type: String, required: true },
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
