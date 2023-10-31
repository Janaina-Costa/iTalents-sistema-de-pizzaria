import express from "express";

import {
  findAllUserController,
  createUserController,
} from "../controller/user.controller";

const router = express.Router();

router.get("/users", findAllUserController);
router.get("/user/:id");
router.post("/user/create", createUserController);
router.put("/user/update/:id");
router.delete("user/delete/:id");

export default router;
