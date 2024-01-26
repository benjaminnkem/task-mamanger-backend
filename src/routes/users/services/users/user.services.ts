import { User, UserRegisterDto } from "../../../../interfaces/user.interface.js";
import user from "../../../../models/user.js";
import bcryptjs from "bcryptjs";

const { compare } = bcryptjs;

export const filterPassword = (user: User) => {
  const { password, ...remaining } = user;

  return remaining;
};

export const createUser = async (userDto: UserRegisterDto): Promise<User> => {
  return await user.create(userDto);
};

export const verifyUserWithPassword = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash);
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await user.findOne({ email });
};

export const findUserById = async (id: string): Promise<User | null> => {
  return await user.findById(id, {
    id: 1,
    email: 1,
    firstName: 1,
    lastName: 1,
  });
};

export const updateUser = async (userDto: UserRegisterDto) => {
  const userExists = await findUserByEmail(userDto.email);

  if (!userExists) throw new Error("user does not exist");

  await user.updateOne({ email: userDto.email }, { $set: { ...userDto } });
};
