import { Document } from "mongoose";

export interface IAdressUser {
  [x: string]: any;
  cep: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
}

// interface IFavoriteItem {
//   _id: string;
// }

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  addresses: IAdressUser[];
  phone: string;
  // favorite_item: IFavoriteItem[];
}
