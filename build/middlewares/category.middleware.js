import { body } from "express-validator";
export const validateCategoryBody = [body("name").notEmpty().isString(), body("user").isObject()];
