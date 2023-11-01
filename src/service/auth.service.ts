import jwt from "jsonwebtoken";

import User from "model/User.Schema";

const login = (email: string) => User.findOne({ email });

const generateToken = (user: any, secret: string) =>
  jwt.sign({ user }, secret, { expiresIn: 84600 });

export default { login, generateToken };
