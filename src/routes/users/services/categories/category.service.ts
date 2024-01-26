import { CreateCategoryDto, UpdateCategoryDto } from "../../../../interfaces/category.interface.js";
import { User } from "../../../../interfaces/user.interface.js";
import category from "../../../../models/category.js";
import { ObjectId } from "mongodb";

export const findCategoryByNameAndUser = async (categoryName: string, userId: string) => {
  return await category.findOne({ name: categoryName, user: { _id: new ObjectId(userId) } });
};

export const addCategory = async (categoryDto: CreateCategoryDto) => {
  const categoryExists = await findCategoryByNameAndUser(categoryDto.name, categoryDto.user._id);

  if (categoryExists) throw new Error("Category already exists");

  await category.create(categoryDto);
};

export const deleteCategory = async (categoryId: string) => await category.deleteOne({ _id: new ObjectId(categoryId) });

export const updateCategory = async (categoryDto: UpdateCategoryDto) => {
  await category.updateOne(
    { _id: new ObjectId(categoryDto._id), user: { _id: new ObjectId(categoryDto.user._id) } },
    { ...categoryDto, updatedAt: new Date() }
  );
};

export const findCategoriesByUser = async (user: User): Promise<UpdateCategoryDto[] | null> => {
  return (await category.find({ user: { _id: new ObjectId(user.id) } })) as UpdateCategoryDto[];
};
