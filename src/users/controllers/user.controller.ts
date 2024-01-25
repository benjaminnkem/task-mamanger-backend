import user from "../../models/user.js";

export const findUserByEmail = async (email: string) => {
  return await user.findOne({ email });
};
