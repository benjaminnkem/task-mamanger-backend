import user from "../../../../models/user.js";
import bcryptjs from "bcryptjs";
const { compare } = bcryptjs;
export const filterPassword = (user) => {
    const { password, ...remaining } = user;
    return remaining;
};
export const createUser = async (userDto) => {
    return await user.create(userDto);
};
export const verifyUserWithPassword = async (password, hash) => {
    return await compare(password, hash);
};
export const findUserByEmail = async (email) => {
    return await user.findOne({ email });
};
export const findUserById = async (id) => {
    return await user.findById(id, {
        id: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
    });
};
export const updateUser = async (userDto) => {
    const userExists = await findUserByEmail(userDto.email);
    if (!userExists)
        throw new Error("user does not exist");
    await user.updateOne({ email: userDto.email }, { $set: { ...userDto } });
};
