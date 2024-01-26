import { Router } from "express";
import userRoute from "./controllers/users/user.controller.js";
import categoryRoute from "./controllers/categories/category.controller.js";
const router = Router();
router.use("/user", userRoute);
router.use("/categories", categoryRoute);
export default router;
