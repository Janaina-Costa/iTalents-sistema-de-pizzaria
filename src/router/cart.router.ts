import express from "express";

const router = express.Router();

router.get("/carts");
router.get("/cart/:id");
router.post("/cart/create");
router.put("/cart/update/:id");
router.delete("/cart/remove/:id");

export default router;
