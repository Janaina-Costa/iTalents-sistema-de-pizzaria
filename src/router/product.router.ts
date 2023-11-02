import express from "express";

import {
  findAllProductsController,
  findProductByIdController,
  createProductController,
  updateProductController,
  removeProductController,
} from "../controller/product.controller";

const router = express.Router();

router.get("/products", findAllProductsController);
router.get("/product/:id", findProductByIdController);
router.post("/product/create", createProductController);
router.put("/product/update/:id", updateProductController);
router.delete("/product/remove/:id", removeProductController);

export default router;
