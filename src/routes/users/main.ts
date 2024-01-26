import { Router } from "express";
import userRoute from "./controllers/users/user.controller.js";

const router = Router();

router.use("/user", userRoute);

export default router;
