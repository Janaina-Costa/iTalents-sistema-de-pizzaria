import express from "express";

import {
  createCartController,
  findAllCartController,
  findCartByIdController,
  removeCartController,
  updateCartController,
} from "controller/cart.controller";
import authUserMiddleware from "middleware/auth.middleware";

const router = express.Router();

router.get("/carts", findAllCartController);
router.get("/cart/:id", findCartByIdController);
router.post("/cart/create", authUserMiddleware, createCartController);
router.put("/cart/update/:id", authUserMiddleware, updateCartController);
router.delete("/cart/remove/:id", authUserMiddleware, removeCartController);

export default router;
