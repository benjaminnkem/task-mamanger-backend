import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const userRegisterBodyValidate = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 8 }),
];

export const userLoginValidate = [body("email").isEmail(), body("password").isString().isLength({ min: 8 })];

export const userUpdateValidate = [
  body("firstName").notEmpty().isString(),
  body("lastName").notEmpty().isString(),
  body("email").isEmail(),
];

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
