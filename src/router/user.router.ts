import express from "express";

import {
  findAllUserController,
  createUserController,
  findUserByIdController,
  updateUserController,
  removeUserController,
} from "../controller/user.controller";

const router = express.Router();

router.get("/users", findAllUserController);
router.get("/user/:id", findUserByIdController);
router.post("/user/create", createUserController);
router.put("/user/update/:id", updateUserController);
router.delete("/user/remove/:id", removeUserController);

export default router;
