import { IUser } from "interface/user";
import User from "model/User.Schema";

const finAllUsersService = () => User.find();

const findUserByIdService = (id: string) => User.findById(id);

const createUserService = ({ ...props }: IUser) => User.create({ ...props });

const updateUserService = (id: string, { ...props }: IUser) =>
  User.findByIdAndUpdate(id, { ...props }, { returnDocument: "after" });

const removeUserService = (id: string) => User.findByIdAndDelete(id);

export default {
  finAllUsersService,
  findUserByIdService,
  createUserService,
  updateUserService,
  removeUserService,
};
