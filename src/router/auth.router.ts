import express from "express";

import loginUserController from "controller/auth.controller";

const router = express.Router();

router.post("/login", loginUserController);

export default router;
