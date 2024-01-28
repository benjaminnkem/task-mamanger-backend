import { body } from "express-validator";
export const createTaskValidate = [
    body("firstName").notEmpty().isString(),
    body("lastName").notEmpty().isString(),
    body("email").isEmail(),
];
