import express from "express";

const router = express.Router();

router.get("/users");
router.get("/user/:id");
router.post("/user/create");
router.put("/user/update/:id");
router.delete("user/delete/:id");

export default router;
