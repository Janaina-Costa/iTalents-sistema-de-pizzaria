import express from "express";
import swaggerUI from "swagger-ui-express";

import swaggerDocs from "../../swagger.json";

const router = express.Router();
router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerDocs));

export default router;
