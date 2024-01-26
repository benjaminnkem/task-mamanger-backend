import { Router, Request, Response } from "express";
import { addCategory, findCategoriesByUser, updateCategory } from "../../services/categories/category.service.js";
import { jwtGuard } from "../../../../guards/jwt.guard.js";
import { findUserByEmail } from "../../services/users/user.services.js";
import {
  validateCategoryBody,
  validateCategoryUpdate,
} from "../../../../middlewares/category-validation.middleware.js";
import { validateRequest } from "../../../../middlewares/index.js";
import connectToDb from "../../../../config/db.js";

const router = Router();

router.get("/", jwtGuard, async (req: Request, res: Response) => {
  // @ts-ignore
  const userPayload = req.user;

  try {
    await connectToDb();
    const categories = await findCategoriesByUser(userPayload);

    return res.status(200).json(categories);
  } catch (e: any) {
    console.log(e);

    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/new", jwtGuard, validateCategoryBody, validateRequest, async (req: Request, res: Response) => {
  // @ts-ignore
  const userPayload = req.user;
  const body = req.body;

  try {
    await connectToDb();
    const user = await findUserByEmail(userPayload.email);

    if (!user) return res.status(401).json({ message: "User not found" });

    await addCategory(body);

    res.status(201).json();
  } catch (e: any) {
    return res.status(500).json({ message: e.message ?? "Internal server error" });
  }
});

router.patch("/", jwtGuard, validateCategoryUpdate, validateRequest, async (req: Request, res: Response) => {
  // @ts-ignore
  const userPayload = req.user;
  const body = req.body;

  try {
    await connectToDb();
    const user = await findUserByEmail(userPayload.email);

    if (!user) return res.status(401).json({ message: "User not found" });

    await updateCategory(body);

    res.status(201).json();
  } catch (e: any) {
    return res.status(500).json({ message: e.message ?? "Internal server error" });
  }
});

export default router;
