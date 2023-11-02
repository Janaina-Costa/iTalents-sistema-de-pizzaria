import express from "express";

import authUserMiddleware from "middleware/auth.middleware";

import {
  findAllUserController,
  createUserController,
  findUserByIdController,
  updateUserController,
  removeUserController,
  addUserAddressController,
  removeUserAddressController,
  addUserFavoriteProductController,
  removeUserFavoriteProductController,
} from "../controller/user.controller";

const router = express.Router();

/* Rotas do usuário */
router.get("/users", findAllUserController);
router.get("/user/:id", findUserByIdController);
router.post("/user/create", createUserController);
router.put("/user/update/:id", authUserMiddleware, updateUserController);
router.delete("/user/remove/:id", removeUserController);

/* Rotas do endereço do usuário */
router.post(
  "/user/createAddress/:id",
  authUserMiddleware,
  addUserAddressController,
);
router.delete(
  "/user/removeAddress",
  authUserMiddleware,
  removeUserAddressController,
);
/* Rotas dos favoritos do usuário */
router.post(
  "/user/add-favorite/:id",
  authUserMiddleware,
  addUserFavoriteProductController,
);
router.delete(
  "/user/remove-favorite",
  authUserMiddleware,
  removeUserFavoriteProductController,
);

export default router;
