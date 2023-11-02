import express from "express";

import authRouter from "./auth.router";
import cartRouter from "./cart.router";
import productRouter from "./product.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/", userRouter);
router.use("/", authRouter);
router.use("/", productRouter);
router.use("/", cartRouter);

export default router;
