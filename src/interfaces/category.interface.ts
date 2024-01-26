import { User } from "./user.interface.js";

export interface Category {
  name: string;
  description: string;
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
