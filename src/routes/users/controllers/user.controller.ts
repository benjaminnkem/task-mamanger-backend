import { Router, Request, Response } from "express";
import { jwtGuard } from "../../../guards/jwt.guard.js";

const router = Router();

router.get("/", jwtGuard, async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  console.log(user);

  return res.status(200).json({
    message: "Authentication worked",
  });
});

export default router;
