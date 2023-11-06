import express from "express";

import {
  createOrdersController,
  findAllOrdersController,
  findOrderByIdController,
  removeOrderController,
  updateStatusOrderController,
} from "controller/order.controller";
import authUserMiddleware from "middleware/auth.middleware";
import { validateId, validateOrder } from "middleware/validation.middleware";

const router = express.Router();

router.get("/orders", authUserMiddleware, findAllOrdersController);
router.get(
  "/order/:id",
  authUserMiddleware,
  validateId,
  findOrderByIdController,
);
router.post(
  "/order/create",
  authUserMiddleware,
  validateOrder,
  createOrdersController,
);
router.delete(
  "/order/remove/:id",
  authUserMiddleware,
  validateId,
  removeOrderController,
);

router.patch(
  "/order/updateStatus/:id",
  authUserMiddleware,
  validateId,
  updateStatusOrderController,
);

export default router;
