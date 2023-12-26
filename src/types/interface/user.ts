import { Document } from "mongoose";

export interface IAdressUser {
  _id?: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
}

export interface IFavoriteProduct {
  _id: string;
}

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  addresses: IAdressUser[];
  phone: string;
  favorite_product: IFavoriteProduct[];
}
