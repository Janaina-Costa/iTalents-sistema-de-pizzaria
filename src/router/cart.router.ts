import express from "express";

import {
  createCartController,
  findAllCartController,
  findCartByIdController,
  removeCartController,
  updateCartController,
} from "controller/cart.controller";
import authUserMiddleware from "middleware/auth.middleware";
import { validateCart, validateId } from "middleware/validation.middleware";

const router = express.Router();

router.get("/carts", authUserMiddleware, findAllCartController);
router.get("/cart/:id", authUserMiddleware, validateId, findCartByIdController);
router.post("/cart/create", authUserMiddleware, createCartController);
router.put(
  "/cart/update/:id",
  authUserMiddleware,
  validateCart,
  updateCartController,
);
router.delete(
  "/cart/remove/:id",
  authUserMiddleware,
  validateId,
  removeCartController,
);

export default router;
