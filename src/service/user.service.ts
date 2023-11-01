import { IUser } from "interface/user";
import User from "model/User.Schema";

const finAllUsersService = () => User.find();

const findUserByIdService = (id: string) => User.findById(id);

const createUserService = ({ ...props }: IUser) => User.create({ ...props });

const updateUserService = (id: string, { ...props }: IUser) =>
  User.findByIdAndUpdate(id, { ...props }, { returnDocument: "after" });

const removeUserService = (id: string) => User.findByIdAndDelete(id);

const addUserAddressService = (id: string, address: any) =>
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

const removeUserAddressService = (id: string, addressId: string) =>
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

const addUserFavoriteItemService = () => {};
const removeUserFavoriteItemService = () => {};

export default {
  finAllUsersService,
  findUserByIdService,
  createUserService,
  updateUserService,
  removeUserService,
  addUserAddressService,
  removeUserAddressService,
  addUserFavoriteItemService,
  removeUserFavoriteItemService,
};
