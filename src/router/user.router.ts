import express from "express";

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
} from "controller/user.controller";
import authUserMiddleware from "middleware/auth.middleware";
import {
  validateFavoriteProduct,
  validateId,
  validateUser,
  validateUserAddress,
} from "middleware/validation.middleware";

const router = express.Router();

/* Rotas do usuário */
router.get("/users", authUserMiddleware, findAllUserController);
router.get("/user/:id", authUserMiddleware, validateId, findUserByIdController);
router.post("/user/create", validateUser, createUserController);
router.put(
  "/user/update/:id",
  authUserMiddleware,
  validateId,
  updateUserController,
);
router.delete(
  "/user/remove/:id",
  authUserMiddleware,
  validateId,
  removeUserController,
);

/* Rotas do endereço do usuário */
router.post(
  "/user/createAddress/:id",
  authUserMiddleware,
  validateId,
  validateUserAddress,
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
  validateId,
  validateFavoriteProduct,
  addUserFavoriteProductController,
);
router.delete(
  "/user/remove-favorite",
  authUserMiddleware,
  removeUserFavoriteProductController,
);

export default router;
