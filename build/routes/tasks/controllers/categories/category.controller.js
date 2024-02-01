import { Router } from "express";
import { addCategory, deleteCategory, findCategoriesByUser, updateCategory, } from "../../services/categories/category.service.js";
import { jwtGuard } from "../../../../guards/jwt.guard.js";
import { findUserByEmail } from "../../../users/services/users/user.services.js";
import { validateCategoryBody, validateCategoryUpdate, } from "../../../../middlewares/category-validation.middleware.js";
import { validateRequest } from "../../../../middlewares/index.js";
import connectToDb from "../../../../config/db.js";
const router = Router();
router.get("/", jwtGuard, async (req, res) => {
    const userPayload = req.user;
    try {
        await connectToDb();
        const categories = await findCategoriesByUser(userPayload);
        return res.status(200).json(categories);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/new", jwtGuard, validateCategoryBody, validateRequest, async (req, res) => {
    const userPayload = req.user;
    const body = req.body;
    try {
        await connectToDb();
        const user = await findUserByEmail(userPayload.email);
        if (!user)
            return res.status(401).json({ message: "User not found" });
        await addCategory({
            name: body.name,
            description: body.description,
            user: { ...body.user },
        });
        res.status(201).json();
    }
    catch (e) {
        return res.status(500).json({ message: e.message ?? "Internal server error" });
    }
});
router.patch("/", jwtGuard, validateCategoryUpdate, validateRequest, async (req, res) => {
    const userPayload = req.user;
    const body = req.body;
    try {
        await connectToDb();
        const user = await findUserByEmail(userPayload.email);
        if (!user)
            return res.status(401).json({ message: "User not found" });
        await updateCategory(body);
        res.status(204).json();
    }
    catch (e) {
        return res.status(500).json({ message: e.message ?? "Internal server error" });
    }
});
router.delete("/:id", jwtGuard, async (req, res) => {
    try {
        await connectToDb();
        const categoryId = req.params.id;
        await deleteCategory(categoryId);
        res.status(204).json();
    }
    catch (e) {
        return res.status(500).json({ message: e.message ?? "Internal server error" });
    }
});
export default router;
