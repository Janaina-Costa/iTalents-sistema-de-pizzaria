import express from "express";

import authRouter from "./auth.router";
import cartRouter from "./cart.router";
import docs from "./docs.router";
import orderRouter from "./order.router";
import productRouter from "./product.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/", userRouter);
router.use("/", authRouter);
router.use("/", productRouter);
router.use("/", cartRouter);
router.use("/", orderRouter);
router.use("/", docs);

export default router;
