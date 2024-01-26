import { Router, Request, Response } from "express";
import "dotenv/config";
import connectToDb from "../../../config/db.js";
import { UserRegisterDto } from "../../../interfaces/user.interface.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import {
  userLoginValidate,
  userRegisterBodyValidate,
  validateRequest,
} from "../../../middlewares/user-validation.middleware.js";
import { createUser, findUserByEmail, verifyUserWithPassword } from "../../users/services/users/user.services.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = Router();
const { hash } = bcryptjs;
const { sign } = jwt;

router.post("/register", userRegisterBodyValidate, validateRequest, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await connectToDb();
    const body = req.body as UserRegisterDto;

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

    await createUser(newUser);
    return res.status(201).json();
  } catch (e: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", userLoginValidate, validateRequest, async (req: Request, res: Response) => {
  const body = req.body;

  const EXPIRY_TIME = "1h";

  try {
    await connectToDb();

    const user = await findUserByEmail(body.email);

    if (!user) return res.status(401).json({ message: "User with email not found" });

    const verify = await verifyUserWithPassword(body.password, user.password);

    if (!verify) return res.status(401).json({ message: "Wrong password" });

    const payloadToSign = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const secret = process.env.JWT_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!secret || !refreshSecret) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const accessToken = sign(payloadToSign, secret, {
      expiresIn: EXPIRY_TIME,
    });

    const refreshToken = sign(payloadToSign, refreshSecret, {
      expiresIn: "7d",
    });

    const payload = {
      accessToken,
      refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + 60 * 1000 * 15),
    };

    return res.status(200).json(payload);
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
