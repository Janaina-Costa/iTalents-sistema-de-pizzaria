import { IUser } from "interface/user";
import User from "model/User.Schema";

interface IUserService extends IUser {
  id?: string;
}
const finAllUsersService = () => User.find();

const findUserByIdService = ({ id }: IUserService) => User.findById(id);

const createUserService = ({ ...props }: IUserService) =>
  User.create({ ...props });

const updateUserService = ({ id, ...props }: IUserService) =>
  User.findByIdAndUpdate(id, { ...props }, { returnDocument: "after" });

const removeUserService = ({ id }: IUserService) => User.findByIdAndDelete(id);

export default {
  finAllUsersService,
  findUserByIdService,
  createUserService,
  updateUserService,
  removeUserService,
};
