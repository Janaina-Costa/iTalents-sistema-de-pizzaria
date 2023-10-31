interface IAdressUser {
  cep: string;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  phone: string;
}

interface IFavoriteItem {
  _id: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  image: string;
  address: IAdressUser[];
  favorite_item: IFavoriteItem[];
  admin: boolean;
}
