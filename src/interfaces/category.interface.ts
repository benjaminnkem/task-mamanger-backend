export interface CreateCategoryDto {
  name: string;
  description: string;
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface UpdateCategoryDto extends CreateCategoryDto {
  _id: string;
}
