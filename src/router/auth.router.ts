import express from "express";

import loginUserController from "controller/auth.controller";
import { validateLogin } from "middleware/validation.middleware";

const router = express.Router();

router.post("/login", validateLogin, loginUserController);

export default router;
