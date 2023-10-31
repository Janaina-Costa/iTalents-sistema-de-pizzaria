import { IUser } from "interface/user";
import User from "model/User.Schema";

interface IUserService {
  id: string;
  user: IUser;
}
const finAllUsersService = () => User.find();

const findUserByIdService = ({ id }: IUserService) => User.findById(id);

const createUserService = ({ user }: IUserService) => User.create({ ...user });

const updateUserService = ({ id, user }: IUserService) =>
  User.findByIdAndUpdate(id, { ...user }, { returnDocument: "after" });

const removeUserService = ({ id }: IUserService) => User.findByIdAndDelete(id);

export default {
  finAllUsersService,
  findUserByIdService,
  createUserService,
  updateUserService,
  removeUserService,
};
