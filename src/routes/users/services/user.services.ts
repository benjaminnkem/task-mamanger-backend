import { User, UserRegisterDto } from "../../../interfaces/user.interface.js";
import user from "../../../models/user.js";
import bcryptjs from "bcryptjs";

const { compare } = bcryptjs;

export const filterPassword = (user: User) => {
  const { password, ...remaining } = user;

  return remaining;
};

export const createUser = async (userDto: UserRegisterDto): Promise<User> => {
  return await user.create(userDto);
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await user.findOne({ email });
};

export const verifyUserWithPassword = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash);
};
