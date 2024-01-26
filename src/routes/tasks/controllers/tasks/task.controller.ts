import { Router, Request, Response } from "express";
import { jwtGuard } from "../../../../guards/jwt.guard.js";
import connectToDb from "../../../../config/db.js";

const router = Router();

router.get("/:userId", jwtGuard, async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    await connectToDb();

    console.log(userId);

    return res.status(200).json({});
  } catch (e: any) {
    console.log(e);

    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
