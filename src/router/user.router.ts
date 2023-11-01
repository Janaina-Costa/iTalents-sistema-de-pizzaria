import express from "express";

import {
  findAllUserController,
  createUserController,
  findUserByIdController,
  updateUserController,
  removeUserController,
  addUserAddressController,
  removeUserAddressController,
} from "../controller/user.controller";

const router = express.Router();

/* Rotas do usuário */
router.get("/users", findAllUserController);
router.get("/user/:id", findUserByIdController);
router.post("/user/create", createUserController);
router.put("/user/update/:id", updateUserController);
router.delete("/user/remove/:id", removeUserController);

/* Rotas do endereço do usuário */
router.post("/user/address/createAddress/:id", addUserAddressController);
router.delete("/user/address/removeAddress", removeUserAddressController);
/* Rotas dos favoritos do usuário */

export default router;
