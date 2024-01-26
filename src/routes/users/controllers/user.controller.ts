import { Router, Request, Response } from "express";
import { jwtGuard } from "../../../guards/jwt.guard.js";
import { User } from "../../../interfaces/user.interface.js";
import connectToDb from "../../../config/db.js";
import { findUserById, updateUser } from "../services/user.services.js";
import { userUpdateValidate, validateRequest } from "../../../middlewares/user-validation.middleware.js";

const router = Router();

router.get("/", jwtGuard, async (req: Request, res: Response) => {
  // @ts-ignore
  const userPayload = req.user as User;

  try {
    await connectToDb();

    const user = await findUserById(userPayload.id);

    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/", jwtGuard, userUpdateValidate, validateRequest, async (req: Request, res: Response) => {
  try {
    await connectToDb();

    await updateUser(req.body);

    return res.status(201).json();
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
