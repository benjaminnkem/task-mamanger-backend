import { Router, Request, Response } from "express";
import { jwtGuard } from "../../../../guards/jwt.guard.js";
import connectToDb from "../../../../config/db.js";
import { validate } from "../../../../middlewares/index.js";
import { createTaskSchema } from "../../../../middlewares/validator/task.validator.js";

const router = Router();

router.get("/:userId", jwtGuard, validate(createTaskSchema), async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    await connectToDb();

    console.log(userId);

    return res.status(200).json({});
  } catch (e: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
