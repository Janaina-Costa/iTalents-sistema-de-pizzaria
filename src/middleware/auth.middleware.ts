/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { SECRET_TOKEN } from "settings";

import * as userService from "../service/user.service";

const secret = SECRET_TOKEN;
interface IGetUserAuthRequest extends Request {
  userId?: string;
}

const authUserMiddleware = (
  req: IGetUserAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: "Empty token!" });
    }

    const partsOfToken = authHeader.split(" ");
    if (partsOfToken.length !== 2) {
      return res.status(401).send({ message: "Invalid token!" });
    }
    const matchBearer = /^Bearer$/i;
    const [scheme, token] = partsOfToken;

    if (!matchBearer.test(scheme)) {
      return res.status(401).send({ message: "Poorly formatted token!" });
    }

    jwt.verify(token, secret, async (error, decoded) => {
      if (error) {
        console.log(`Erro: ${error}`);
        return res.status(500).send({ message: "Token has expired" });
      }
      const { user: decodedId }: any = decoded;

      const user = await userService.findUserByIdService(decodedId._id);
      if (!user || !user.id) {
        return res.status(401).send({ message: "Invalid token!" });
      }

      req.userId = decodedId._id;
      return next();
    });
  } catch (err: any) {
    console.log(`Erro: ${err.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export default authUserMiddleware;
