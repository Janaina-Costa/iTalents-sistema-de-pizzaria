import express from "express";

import {
  createOrdersController,
  findAllOrdersController,
  findOrderByIdController,
  removeOrderController,
  updateStatusOrderController,
} from "controller/order.controller";
import authUserMiddleware from "middleware/auth.middleware";

const router = express.Router();

router.get("/orders", findAllOrdersController);
router.get("/order/:id", findOrderByIdController);
router.post("/order/create", authUserMiddleware, createOrdersController);
router.delete("/order/remove/:id", authUserMiddleware, removeOrderController);

router.patch(
  "/order/updateStatus/:id",
  authUserMiddleware,
  updateStatusOrderController,
);

export default router;
