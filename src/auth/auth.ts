import { Router } from "express";
import "dotenv/config";

const router = Router();

router.get("/", (req, res) => {
  res.send(`Hello World! ${JSON.stringify(process.env.MONGODB_URI)}`);
});

export default router;
