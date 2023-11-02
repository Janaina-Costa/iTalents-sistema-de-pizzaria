import express from "express";

import {
  createCartController,
  findAllCartController,
  findCartByIdController,
  removeCartController,
  updateCartController,
} from "controller/cart.controller";

const router = express.Router();

router.get("/carts", findAllCartController);
router.get("/cart/:id", findCartByIdController);
router.post("/cart/create", createCartController);
router.put("/cart/update/:id", updateCartController);
router.delete("/cart/remove/:id", removeCartController);

export default router;
