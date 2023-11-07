import express from "express";

import {
  findAllProductsController,
  findProductByIdController,
  createProductController,
  updateProductController,
  removeProductController,
} from "controller/product.controller";
import authUserMiddleware from "middleware/auth.middleware";
import {
  validateId,
  validateProduct,
  validateProductBody,
} from "middleware/validation.middleware";

const router = express.Router();

router.get("/products", findAllProductsController);
router.get("/product/:id", validateId, findProductByIdController);
router.post(
  "/product/create",
  authUserMiddleware,
  validateProduct,
  validateProductBody,
  createProductController,
);
router.put(
  "/product/update/:id",
  authUserMiddleware,
  validateProductBody,
  updateProductController,
);
router.delete(
  "/product/remove/:id",
  authUserMiddleware,
  removeProductController,
);

export default router;
