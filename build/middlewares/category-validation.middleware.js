import { body } from "express-validator";
const base = [body("name").notEmpty().isString(), body("user").isObject()];
export const validateCategoryBody = [...base];
export const validateCategoryUpdate = [body("_id").notEmpty().isString(), ...base];
