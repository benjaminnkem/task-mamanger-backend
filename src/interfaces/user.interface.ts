export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export interface UserRegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export interface UserLoginDto {
  email: string;
  password: string;
}
