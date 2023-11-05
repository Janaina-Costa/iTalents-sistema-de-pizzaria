import express from "express";

import {
  findAllProductsController,
  findProductByIdController,
  createProductController,
  updateProductController,
  removeProductController,
} from "controller/product.controller";
import { validateProduct } from "middleware/validation.middleware";

const router = express.Router();

router.get("/products", findAllProductsController);
router.get("/product/:id", findProductByIdController);
router.post("/product/create", validateProduct, createProductController);
router.put("/product/update/:id", updateProductController);
router.delete("/product/remove/:id", removeProductController);

export default router;
