import { Router } from "express";
import categoryRoute from "./controllers/categories/category.controller.js";
const router = Router();
router.use("/categories", categoryRoute);
export default router;
