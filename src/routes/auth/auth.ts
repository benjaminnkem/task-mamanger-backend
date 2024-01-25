import { Router, Request, Response } from "express";
import "dotenv/config";
import connectToDb from "../../config/db.js";
import user from "../../models/user.js";
import { User } from "../../interfaces/user.interface.js";
import bcryptjs from "bcryptjs";
import { findUserByEmail } from "../../users/controllers/user.controller.js";
import { validationResult } from "express-validator";
import { userRegisterBodyValidate, validateRegister } from "../../middlewares/user-validation.middleware.js";

const router = Router();
const { hash } = bcryptjs;

router.post("/register", userRegisterBodyValidate, validateRegister, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await connectToDb();
    const body = req.body as User;

    if (!body) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }

    const existCheck = await findUserByEmail(body.email);

    if (existCheck) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await hash(body.password, 12);

    const newUser = {
      email: body.email,
      password: hashedPassword,
      firstName: body.firstName,
      lastName: body.lastName,
    };

    await user.create(newUser);
    return res.status(201).json();
  } catch (e: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
