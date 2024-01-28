import { Router } from "express";
import categoryRoute from "./controllers/categories/category.controller.js";
import taskRoute from "./controllers/tasks/task.controller.js";
const router = Router();
router.use("/categories", categoryRoute);
router.use("/tasks", taskRoute);
export default router;
