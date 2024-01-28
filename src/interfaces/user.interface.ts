export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserRegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}
