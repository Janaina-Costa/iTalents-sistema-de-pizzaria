import { Schema, model } from "mongoose";

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
        cellphone: { type: String, required: true },
      },
    ],
    favorite_item: [
      {
        _id: Schema.Types.ObjectId,
        unique: true,
        ref: "products",
      },
    ],
    admin: { type: Boolean, required: true, default: false },
  },

  { timestamps: true },
);

const User = model("users", UserSchema);

export default User;
