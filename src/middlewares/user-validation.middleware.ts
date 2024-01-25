import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const userRegisterBodyValidate = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").isEmail(),
];

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
