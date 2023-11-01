import express from "express";

import authRouter from "./auth.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/", userRouter);
router.use("/", authRouter);

export default router;
