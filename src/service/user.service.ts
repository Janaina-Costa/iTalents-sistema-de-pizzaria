import User from "model/User.Schema";
import { IUser } from "types/interface/user";

export const finAllUsersService = () => User.find();

export const findUserByIdService = (id: string) => User.findById(id);

export const createUserService = ({ ...props }: IUser) =>
  User.create({ ...props });

export const updateUserService = (id: string, { ...props }: IUser) =>
  User.findByIdAndUpdate(id, { ...props }, { returnDocument: "after" });

export const removeUserService = (id: string) => User.findByIdAndRemove(id);

export const addUserAddressService = (id: string, address: any) =>
  User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        addresses: address,
      },
    },
    {
      includeResultMetadata: true,
    },
  );

export const removeUserAddressService = (id: string, addressId: string) =>
  User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        addresses: {
          _id: addressId,
        },
      },
    },
    {
      includeResultMetadata: true,
    },
  );

export const addUserFavoriteItemService = () => {};
export const removeUserFavoriteItemService = () => {};
