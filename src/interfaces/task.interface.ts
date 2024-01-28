import { CreateCategoryDto } from "./category.interface.js";
import { User } from "./user.interface.js";

export interface CreateTaskDto {
  title: string;
  description: string;
  user: User;
  category: CreateCategoryDto | null;
  dueDate: Date;
}

export interface UpdateTaskDto extends CreateTaskDto {
  _id: string;
}
