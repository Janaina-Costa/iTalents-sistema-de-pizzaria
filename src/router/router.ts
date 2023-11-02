import express from "express";

import authRouter from "./auth.router";
import productRouter from "./product.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/", userRouter);
router.use("/", authRouter);
router.use("/", productRouter);

export default router;
