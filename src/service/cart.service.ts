import Cart from "model/Cart.Schema";
import { ICart } from "types/interface/cart";

export const findAllCartService = () => Cart.find();

export const findCartByIdService = (id: string) => Cart.findById(id);

export const createCartService = (body: any) => Cart.create(body);

export const updateCartService = (id: string, { ...cart }: ICart) =>
  Cart.findByIdAndUpdate(id, { ...cart }, { returnDocument: "after" });

export const removeCartService = (id: string) => Cart.findByIdAndRemove(id);
